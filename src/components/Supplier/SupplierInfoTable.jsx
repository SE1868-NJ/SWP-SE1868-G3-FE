import { useState, useEffect, useRef } from "react";
import { addressService } from "../../services/addressService";

function SupplierInfoTable({ supplier, handleChange, errors = {}, readOnly = false }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [touched, setTouched] = useState({
    supplier_code: false,
    supplier_name: false,
    delivery_time: false,
    province: false,
    district: false,
    ward: false,
    contact_name: false,
    phone_number: false
  });
  const [isLoading, setIsLoading] = useState({
    provinces: false,
    districts: false,
    wards: false
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const supplierCodeRef = useRef(null);

  // Đặt giá trị mặc định cho supplier_code khi component được tải lần đầu
  useEffect(() => {
    if (!supplier.supplier_code && !window.location.pathname.includes('/edit/')) {
      handleChange({ target: { name: 'supplier_code', value: 'NCC-' } });
    }
  }, []);

  // Xử lý vị trí con trỏ cho input mã nhà cung cấp
  useEffect(() => {
    if (supplierCodeRef.current && supplier.supplier_code === 'NCC-') {
      supplierCodeRef.current.setSelectionRange(4, 4);
    }
  }, [supplier.supplier_code]);

  useEffect(() => {
    const form = document.querySelector('form');
    if (!form) return;
    const originalSubmit = form.onsubmit;
    form.onsubmit = (e) => {
      setAttemptedSubmit(true);
      const isFormValid = validateForm();
      if (!isFormValid) {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => {
          const firstInvalidField = document.querySelector('.is-invalid');
          if (firstInvalidField) {
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalidField.focus();
          }
        }, 100);
        return false;
      }

      if (originalSubmit && typeof originalSubmit === 'function') {
        return originalSubmit(e);
      }

      return true;
    };

    supplier.validateAddressForm = () => {
      setAttemptedSubmit(true);
      return validateAddressFields();
    };

    return () => {
      form.onsubmit = originalSubmit;
    };
  }, [supplier]);

  const validateAddressFields = () => {
    return province !== "" &&
      (province === "" || district !== "") &&
      (district === "" || ward !== "");
  };

  const validateForm = () => {
    let isValid = true;
    if (!supplier.supplier_code || supplier.supplier_code === 'NCC-') isValid = false;
    if (!supplier.supplier_name) isValid = false;
    if (!supplier.delivery_time) isValid = false;
    if (!supplier.contact_name) isValid = false;
    if (!supplier.phone_number) isValid = false;

    if (!validateAddressFields()) isValid = false;
    return isValid;
  };

  useEffect(() => {
    const addressParts = supplier.address ? supplier.address.split(", ") : [];
    setWard("");
    setDistrict("");
    setProvince("");

    if (addressParts.length >= 3) setWard(addressParts[0]);
    if (addressParts.length >= 2) setDistrict(addressParts[addressParts.length - 2]);
    if (addressParts.length >= 1) setProvince(addressParts[addressParts.length - 1]);
  }, [supplier.address]);

  useEffect(() => {
    async function loadProvinces() {
      setIsLoading(prev => ({ ...prev, provinces: true }));
      try {
        const response = await addressService.getAllProvince();
        if (response.status === 'success') {
          setProvinces(response.data);
        }
      } catch (error) {
      } finally {
        setIsLoading(prev => ({ ...prev, provinces: false }));
      }
    }
    loadProvinces();
  }, []);

  useEffect(() => {
    async function loadDistricts() {
      if (!province) {
        setDistricts([]);
        return;
      }
      setIsLoading(prev => ({ ...prev, districts: true }));
      try {
        const selectedProvince = provinces.find(p => p.name === province);
        if (selectedProvince) {
          const response = await addressService.getDistricByProvince(selectedProvince.id);
          if (response.status === 'success') {
            setDistricts(response.data);
          }
        }
      } catch (error) {
      } finally {
        setIsLoading(prev => ({ ...prev, districts: false }));
      }
    }
    if (province) {
      loadDistricts();
    } else {
      setDistricts([]);
    }
  }, [province, provinces]);

  useEffect(() => {
    async function loadWards() {
      if (!district) {
        setWards([]);
        return;
      }
      setIsLoading(prev => ({ ...prev, wards: true }));
      try {
        const selectedDistrict = districts.find(d => d.name === district);
        if (selectedDistrict) {
          const response = await addressService.getWardsByDistrict(selectedDistrict.id);
          if (response.status === 'success') {
            setWards(response.data);
          }
        }
      } catch (error) {
      } finally {
        setIsLoading(prev => ({ ...prev, wards: false }));
      }
    }

    if (district) {
      loadWards();
    } else {
      setWards([]);
    }
  }, [district, districts]);

  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setProvince(value);
    setDistrict("");
    setWard("");
    setDistricts([]);
    setWards([]);

    setTouched(prev => ({ ...prev, province: true }));

    const newAddress = value ? `${value}` : "";
    handleChange({ target: { name: "address", value: newAddress } });
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setDistrict(value);
    setWard("");
    setWards([]);

    setTouched(prev => ({ ...prev, district: true }));

    const newAddress = value ? `${value}, ${province}` : province;
    handleChange({ target: { name: "address", value: newAddress } });
  };

  const handleWardChange = (e) => {
    const value = e.target.value;
    setWard(value);

    setTouched(prev => ({ ...prev, ward: true }));

    const newAddress = value ? `${value}, ${district}, ${province}` : `${district}, ${province}`;
    handleChange({ target: { name: "address", value: newAddress } });
  };

  // Xử lý đặc biệt cho input mã nhà cung cấp
  const handleSupplierCodeChange = (e) => {
    const { value } = e.target;
    const prefix = 'NCC-';

    // Luôn giữ prefix
    if (!value.startsWith(prefix)) {
      // Nếu người dùng cố gắng thay đổi hoặc xóa prefix
      const newValue = prefix + value.replace(/^NCC-?/i, '');
      handleChange({ target: { name: 'supplier_code', value: newValue } });
    } else {
      // Nếu prefix được giữ nguyên, truyền giá trị như bình thường
      handleChange(e);
    }

    setTouched(prev => ({ ...prev, supplier_code: true }));
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    handleChange(e);
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const showFieldError = (fieldName) => {
    if (fieldName === 'supplier_code') {
      return (touched[fieldName] || attemptedSubmit) && (!supplier[fieldName] || supplier[fieldName] === 'NCC-');
    }
    return (touched[fieldName] || attemptedSubmit) && !supplier[fieldName];
  };

  const showProvinceError = (touched.province || attemptedSubmit || errors.address) && !province;
  const showDistrictError = ((touched.district || attemptedSubmit) && province && !district);
  const showWardError = ((touched.ward || attemptedSubmit) && district && !ward);

  return (
    <>
      <h5 className="fw-bold text-decoration-underline">Thông Tin Cơ Bản</h5>
      <div className='mb-3'>
        <label className='form-label'>Mã Nhà Cung Cấp <span className="text-danger">*</span></label>
        <input
          type='text'
          name='supplier_code'
          className={`form-control ${showFieldError('supplier_code') || errors.supplier_code ? 'is-invalid' : ''}`}
          value={supplier.supplier_code || 'NCC-'}
          onChange={handleSupplierCodeChange}
          onBlur={() => handleBlur('supplier_code')}
          disabled={readOnly || window.location.pathname.includes('/edit/')}
          ref={supplierCodeRef}
          onFocus={(e) => {
            // Đặt con trỏ ở cuối text khi focus
            const length = e.target.value.length;
            e.target.setSelectionRange(length, length);
          }}
        />
        {(showFieldError('supplier_code') || errors.supplier_code) && (
          <div className="invalid-feedback">{errors.supplier_code || "Mã nhà cung cấp không được để trống hoặc chỉ chứa tiền tố"}</div>
        )}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Tên Nhà Cung Cấp <span className="text-danger">*</span></label>
        <input
          type='text'
          name='supplier_name'
          className={`form-control ${showFieldError('supplier_name') || errors.supplier_name ? 'is-invalid' : ''}`}
          value={supplier.supplier_name || ''}
          onChange={handleInputChange}
          onBlur={() => handleBlur('supplier_name')}
          disabled={readOnly}
        />
        {(showFieldError('supplier_name') || errors.supplier_name) && (
          <div className="invalid-feedback">{errors.supplier_name || "Tên nhà cung cấp không được để trống"}</div>
        )}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Thời Gian Giao Hàng (Ngày) <span className="text-danger">*</span></label>
        <input
          type='number'
          name='delivery_time'
          className={`form-control ${showFieldError('delivery_time') || errors.delivery_time ? 'is-invalid' : ''}`}
          value={supplier.delivery_time || ''}
          onChange={handleInputChange}
          onBlur={() => handleBlur('delivery_time')}
          disabled={readOnly}
        />
        {(showFieldError('delivery_time') || errors.delivery_time) && (
          <div className="invalid-feedback">{errors.delivery_time || "Thời gian giao hàng không được để trống"}</div>
        )}
      </div>

      <h5 className="fw-bold text-decoration-underline">Thông Tin Giao Dịch</h5>
      <div className='mb-3'>
        <label className='form-label'>Tên Ngân Hàng</label>
        <select
          name='bank_name'
          className='form-select'
          value={supplier.bank_name || ''}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value="">-- Chọn Ngân Hàng --</option>
          <option value="MB Bank">MB Bank</option>
          <option value="Vietcombank">Vietcombank</option>
          <option value="Techcombank">Techcombank</option>
          <option value="BIDV">BIDV</option>
          <option value="ACB">ACB</option>
          <option value="Sacombank">Sacombank</option>
          <option value="Agribank">Agribank</option>
        </select>
      </div>
      <div className='mb-3'>
        <label className='form-label'>Số Tài Khoản</label>
        <input
          type='text'
          name='account_number'
          className='form-control'
          value={supplier.account_number || ''}
          onChange={handleChange}
          disabled={readOnly}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Thời Hạn Thanh Toán</label>
        <input
          type='text'
          name='payment_term'
          className='form-control'
          value={supplier.payment_term || ''}
          onChange={handleChange}
          disabled={readOnly}
        />
      </div>

      <h5 className="fw-bold text-decoration-underline">Địa Chỉ Nhà Cung Cấp</h5>
      <div className="mb-3">
        <label className="form-label">
          Tỉnh/Thành phố <span className="text-danger">*</span>
        </label>
        <select
          value={province}
          onChange={handleProvinceChange}
          onBlur={() => handleBlur('province')}
          className={`form-select ${showProvinceError ? "is-invalid" : ""}`}
          disabled={readOnly || isLoading.provinces}
          style={{ cursor: isLoading.provinces ? 'wait' : 'pointer' }}
        >
          <option value="">
            {isLoading.provinces ? "Đang tải..." : "-- Chọn Tỉnh/Thành phố --"}
          </option>
          {provinces.map((prov) => (
            <option key={prov.id} value={prov.name}>
              {prov.name}
            </option>
          ))}
        </select>
        {showProvinceError && (
          <div className="invalid-feedback">Tỉnh/Thành phố không được để trống</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">
          Quận/Huyện <span className="text-danger">*</span>
        </label>
        <select
          value={district}
          onChange={handleDistrictChange}
          onBlur={() => handleBlur('district')}
          className={`form-select ${showDistrictError ? "is-invalid" : ""}`}
          disabled={readOnly || !province || isLoading.districts}
          style={{ cursor: (!province || isLoading.districts) ? 'not-allowed' : 'pointer' }}
        >
          <option value="">
            {isLoading.districts ? "Đang tải..." : "-- Chọn Quận/Huyện --"}
          </option>
          {districts.map((dist) => (
            <option key={dist.id} value={dist.name}>
              {dist.name}
            </option>
          ))}
        </select>
        {showDistrictError && (
          <div className="invalid-feedback">Quận/Huyện không được để trống</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">
          Xã/Phường <span className="text-danger">*</span>
        </label>
        <select
          value={ward}
          onChange={handleWardChange}
          onBlur={() => handleBlur('ward')}
          className={`form-select ${showWardError ? "is-invalid" : ""}`}
          disabled={readOnly || !district || isLoading.wards}
          style={{ cursor: (!district || isLoading.wards) ? 'not-allowed' : 'pointer' }}
        >
          <option value="">
            {isLoading.wards ? "Đang tải..." : "-- Chọn Xã/Phường --"}
          </option>
          {wards.map((w) => (
            <option key={w.id} value={w.name}>
              {w.name}
            </option>
          ))}
        </select>
        {showWardError && (
          <div className="invalid-feedback">Xã/Phường không được để trống</div>
        )}
      </div>

      <h5 className="fw-bold text-decoration-underline">Thông Tin Liên Hệ</h5>
      <div className='mb-3'>
        <label className='form-label'>Họ và Tên <span className="text-danger">*</span></label>
        <input
          type='text'
          name='contact_name'
          className={`form-control ${showFieldError('contact_name') || errors.contact_name ? 'is-invalid' : ''}`}
          value={supplier.contact_name || ''}
          onChange={handleInputChange}
          onBlur={() => handleBlur('contact_name')}
          disabled={readOnly}
        />
        {(showFieldError('contact_name') || errors.contact_name) && (
          <div className="invalid-feedback">{errors.contact_name || "Họ và tên không được để trống"}</div>
        )}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Số Điện Thoại <span className="text-danger">*</span></label>
        <input
          type='text'
          name='phone_number'
          className={`form-control ${showFieldError('phone_number') || errors.phone_number ? 'is-invalid' : ''}`}
          value={supplier.phone_number || ''}
          onChange={handleInputChange}
          onBlur={() => handleBlur('phone_number')}
          disabled={readOnly}
        />
        {(showFieldError('phone_number') || errors.phone_number) && (
          <div className="invalid-feedback">{errors.phone_number || "Số điện thoại không được để trống"}</div>
        )}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Facebook</label>
        <input
          type='text'
          name='facebook'
          className='form-control'
          value={supplier.facebook || ''}
          onChange={handleChange}
          disabled={readOnly}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Ghi chú</label>
        <input
          type='text'
          name='note'
          className='form-control'
          value={supplier.note || ''}
          onChange={handleChange}
          disabled={readOnly}
        />
      </div>
      <h5 className="fw-bold text-decoration-underline">Trạng Thái</h5>
      <div className='mb-3'>
        <select
          name='status'
          className='form-select'
          value={supplier.status || 'Hoạt động'}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value='Hoạt động'>Hoạt động</option>
          <option value='Không hoạt động'>Không hoạt động</option>
        </select>
      </div>
    </>
  );
}

export default SupplierInfoTable;