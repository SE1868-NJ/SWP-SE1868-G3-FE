import { useState, useEffect } from "react";
import supplierService from "../../services/supplierService";

function SupplierInfoTable({ supplier, handleChange, errors = {}, readOnly = false }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  useEffect(() => {
    if (supplier.address) {
      const [wardPart, districtPart, provincePart] = supplier.address.split(", ");
      setWard(wardPart || "");
      setDistrict(districtPart || "");
      setProvince(provincePart || "");
    }
  }, [supplier.address]);

  useEffect(() => {
    async function loadProvinces() {
      try {
        const data = await supplierService.getProvinces();
        setProvinces(data);
      } catch (error) {
      }
    }
    loadProvinces();
  }, []);

  useEffect(() => {
    async function loadDistricts() {
      try {
        if (province) {
          const provinceObj = provinces.find((p) => p.name === province);
          if (provinceObj) {
            const data = await supplierService.getDistricts(provinceObj.code);
            setDistricts(data);
          }
        } else {
          setDistricts([]);
        }
      } catch (error) {
      }
    }
    loadDistricts();
  }, [province, provinces]);

  useEffect(() => {
    async function loadWards() {
      try {
        if (district) {
          const districtObj = districts.find((d) => d.name === district);
          if (districtObj) {
            const data = await supplierService.getWards(districtObj.code);
            setWards(data);
          }
        } else {
          setWards([]);
        }
      } catch (error) {
      }
    }
    loadWards();
  }, [district, districts]);

  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setProvince(value);
    setDistrict("");
    setWard("");
    setDistricts([]);
    setWards([]);
    const newAddress = `${ward}, ${district}, ${value}`.replace(/, , /g, ", ").replace(/^, |, $/g, "");
    handleChange({ target: { name: "address", value: newAddress } });
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setDistrict(value);
    setWard("");
    setWards([]);
    const newAddress = `${ward}, ${value}, ${province}`.replace(/, , /g, ", ").replace(/^, |, $/g, "");
    handleChange({ target: { name: "address", value: newAddress } });
  };

  const handleWardChange = (e) => {
    const value = e.target.value;
    setWard(value);
    const newAddress = `${value}, ${district}, ${province}`.replace(/, , /g, ", ").replace(/^, |, $/g, "");
    handleChange({ target: { name: "address", value: newAddress } });
  };

  return (
    <>
      <h5 className="fw-bold text-decoration-underline">Thông Tin Cơ Bản</h5>
      <div className='mb-3'>
        <label className='form-label'>Tên Nhà Cung Cấp <span className="text-danger">*</span></label>
        <input
          type='text'
          name='supplier_name'
          className={`form-control ${errors.supplier_name ? 'is-invalid' : ''}`}
          value={supplier.supplier_name}
          onChange={handleChange}
          disabled={readOnly}
        />
        {errors.supplier_name && <div className="invalid-feedback">{errors.supplier_name}</div>}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Thời Gian Giao Hàng (Ngày) <span className="text-danger">*</span></label>
        <input
          type='number'
          name='delivery_time'
          className={`form-control ${errors.delivery_time ? 'is-invalid' : ''}`}
          value={supplier.delivery_time}
          onChange={handleChange}
          disabled={readOnly}
        />
        {errors.delivery_time && <div className="invalid-feedback">{errors.delivery_time}</div>}
      </div>

      <h5 className="fw-bold text-decoration-underline">Thông Tin Giao Dịch</h5>
      <div className='mb-3'>
        <label className='form-label'>Tên Ngân Hàng</label>
        <select
          name='bank_name'
          className='form-select'
          value={supplier.bank_name}
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
        <input type='text' name='account_number' className='form-control' value={supplier.account_number} onChange={handleChange} disabled={readOnly} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Thời Hạn Thanh Toán</label>
        <input type='text' name='payment_term' className='form-control' value={supplier.payment_term} onChange={handleChange} disabled={readOnly} />
      </div>

      <h5 className="fw-bold text-decoration-underline">Địa Chỉ Nhà Cung Cấp</h5>
      <div className="mb-3">
        <label className="form-label">
          Tỉnh/Thành phố <span className="text-danger">*</span>
        </label>
        <select
          value={province}
          onChange={handleProvinceChange}
          className={`form-select ${errors.address ? "is-invalid" : ""}`}
          disabled={readOnly}
        >
          <option value="">-- Chọn Tỉnh/Thành phố --</option>
          {provinces.map((prov) => (
            <option key={prov.code} value={prov.name}>
              {prov.name}
            </option>
          ))}
        </select>
        {errors.address && province === "" && (
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
          className={`form-select ${errors.address ? "is-invalid" : ""}`}
          disabled={readOnly || !province}
        >
          <option value="">-- Chọn Quận/Huyện --</option>
          {districts.map((dist) => (
            <option key={dist.code} value={dist.name}>
              {dist.name}
            </option>
          ))}
        </select>
        {errors.address && district === "" && (
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
          className={`form-select ${errors.address ? "is-invalid" : ""}`}
          disabled={readOnly || !district}
        >
          <option value="">-- Chọn Xã/Phường --</option>
          {wards.map((w) => (
            <option key={w.code} value={w.name}>
              {w.name}
            </option>
          ))}
        </select>
        {errors.address && ward === "" && (
          <div className="invalid-feedback">Xã/Phường không được để trống</div>
        )}
      </div>

      <h5 className="fw-bold text-decoration-underline">Thông Tin Liên Hệ</h5>
      <div className='mb-3'>
        <label className='form-label'>Họ và Tên <span className="text-danger">*</span></label>
        <input
          type='text'
          name='contact_name'
          className={`form-control ${errors.contact_name ? 'is-invalid' : ''}`}
          value={supplier.contact_name}
          onChange={handleChange}
          disabled={readOnly}
        />
        {errors.contact_name && <div className="invalid-feedback">{errors.contact_name}</div>}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Số Điện Thoại <span className="text-danger">*</span></label>
        <input
          type='text'
          name='phone_number'
          className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
          value={supplier.phone_number}
          onChange={handleChange}
          disabled={readOnly}
        />
        {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Facebook</label>
        <input type='text' name='facebook' className='form-control' value={supplier.facebook} onChange={handleChange} disabled={readOnly} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Ghi chú</label>
        <input type='text' name='note' className='form-control' value={supplier.note} onChange={handleChange} disabled={readOnly} />
      </div>
      <h5 className="fw-bold text-decoration-underline">Trạng Thái</h5>
      <div className='mb-3'>
        <select name='status' className='form-select' value={supplier.status} onChange={handleChange} disabled={readOnly}>
          <option value='Hoạt động'>Hoạt động</option>
          <option value='Không hoạt động'>Không hoạt động</option>
        </select>
      </div>
    </>
  );
}

export default SupplierInfoTable;