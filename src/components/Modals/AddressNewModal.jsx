import React, { useState, useEffect } from "react";
// Make sure this path is correct relative to AddressNewModal.js
import { addressService } from "../../services/addressService";
import { useAuth } from "../../hooks/contexts/AuthContext";

const AddressNewModal = ({ show, onHide, onSave }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const [newAddress, setNewAddress] = useState({
    user_id: user.user_id,
    name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    streetAddress: "",
    addressType: "Nhà Riêng",
    isDefault: false,
    isPickupAddress: false
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      if (!show) return;
      try {
        setLoading(true);
        setError(null);
        const response = await addressService.getAllProvince();
        if (response.status === 'success') {
          setProvinces(response.data || []);
        } else {
          throw new Error(response.message || 'Failed to fetch provinces');
        }
      } catch (err) {
        console.error('Error fetching provinces:', err);
        setError('Không thể tải danh sách Tỉnh/Thành phố.');
        setProvinces([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, [show]);

  useEffect(() => {
    const fetchDistricts = async () => {
      setDistricts([]);
      setWards([]);
      setNewAddress(prev => ({ ...prev, district: "", ward: "" }));

      if (!newAddress.province) return;

      const selectedProvince = provinces.find(p => p.name === newAddress.province);
      if (!selectedProvince) return;

      try {
        setLoading(true);
        setError(null);
        const response = await addressService.getDistricByProvince(selectedProvince.id);
        if (response.status === 'success') {
          setDistricts(response.data || []);
        } else {
          throw new Error(response.message || 'Failed to fetch districts');
        }
      } catch (err) {
        console.error('Error fetching districts:', err);
        setError('Không thể tải danh sách Quận/Huyện.');
        setDistricts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, [newAddress.province]);

  useEffect(() => {
    const fetchWards = async () => {
      setWards([]);
      setNewAddress(prev => ({ ...prev, ward: "" }));

      if (!newAddress.district) return;

      const selectedDistrict = districts.find(d => d.name === newAddress.district);
      if (!selectedDistrict) return;

      try {
        setLoading(true);
        setError(null);
        const response = await addressService.getWardsByDistrict(selectedDistrict.id);
        if (response.status === 'success') {
          setWards(response.data || []);
        } else {
          throw new Error(response.message || 'Failed to fetch wards');
        }
      } catch (err) {
        console.error('Error fetching wards:', err);
        setError('Không thể tải danh sách Phường/Xã.');
        setWards([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWards();
  }, [newAddress.district]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError(null);

    setNewAddress(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const resetForm = () => {
    setNewAddress({
      name: "", phone: "", province: "", district: "", ward: "",
      streetAddress: "", addressType: "Nhà Riêng", isDefault: false, isPickupAddress: false
    });
    setDistricts([]);
    setWards([]);
    setError(null);
  }

  const handleSave = async () => {
    setError(null);
    if (!newAddress.name.trim() || !newAddress.phone.trim() || !newAddress.province || !newAddress.district || !newAddress.ward || !newAddress.streetAddress.trim()) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    try {
      setLoading(true);

      const selectedProvince = provinces.find(p => p.name === newAddress.province);
      const selectedDistrict = districts.find(d => d.name === newAddress.district);
      const selectedWard = wards.find(w => w.name === newAddress.ward);

      const addressDataPayload = {
        user_id: user.id,
        full_name: newAddress.name.trim(),
        phone_number: newAddress.phone.trim(),
        province_id: selectedProvince?.id,
        district_id: selectedDistrict?.id,
        ward_id: selectedWard?.id,
        street_address: newAddress.streetAddress.trim(),
        address_type: newAddress.addressType,
        is_default: newAddress.isDefault,
        is_pickup_address: newAddress.isPickupAddress
      };
      console.log('Address Data Payload:', addressDataPayload);

      const response = await addressService.createAddress(addressDataPayload);
      if (response && response.status === 'success' && response.data) {
        const completeAddressForFrontend = {
          id: response.data.id,
          full_name: response.data.name,
          phone_number: response.data.phone,
          streetAddress: response.data.address,
          wardDistrict: `${selectedWard.prefix} ${newAddress.ward}, ${selectedDistrict.prefix} ${newAddress.district}, ${newAddress.province}`,
          province: newAddress.province,
          district: newAddress.district,
          ward: newAddress.ward,
          isDefault: response.data.isDefault,
          isPickupAddress: response.data.isPickup,
          addressType: response.data.type,
        };

        onSave(completeAddressForFrontend);
        resetForm();
        setLoading(false);
        onHide();
      } else {
        throw new Error(response?.message || 'Lưu địa chỉ không thành công.');
      }

    } catch (err) {
      console.error('Error saving address:', err);
      setError(err.message || 'Đã xảy ra lỗi khi lưu địa chỉ. Vui lòng thử lại.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);


  if (!show) return null;

  const isSaveDisabled = loading || !newAddress.name.trim() || !newAddress.phone.trim() || !newAddress.streetAddress.trim() || !newAddress.province || !newAddress.district || !newAddress.ward;

  return (
    <>
      <div className="modal-backdrop show" style={{ zIndex: 1058 }}></div>
      <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1060 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Địa chỉ mới</h5>
              <button type="button" className="btn-close" onClick={onHide} disabled={loading}></button>
            </div>
            <div className="modal-body">
              {loading && <div className="text-center my-3"><div className="spinner-border spinner-border-sm" role="status"></div> Đang tải dữ liệu...</div>}

              {error && <div className="alert alert-danger" role="alert">{error}</div>}

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Họ và tên <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className={`form-control ${error && !newAddress.name.trim() ? 'is-invalid' : ''}`}
                      name="name"
                      value={newAddress.name}
                      onChange={handleInputChange}
                      placeholder="Họ và tên người nhận"
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Số điện thoại <span className="text-danger">*</span></label>
                    <input
                      type="tel"
                      className={`form-control ${error && !newAddress.phone.trim() ? 'is-invalid' : ''}`}
                      name="phone"
                      value={newAddress.phone}
                      onChange={handleInputChange}
                      placeholder="Số điện thoại người nhận"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tỉnh/Thành phố <span className="text-danger">*</span></label>
                  <select
                    className={`form-select ${error && !newAddress.province ? 'is-invalid' : ''}`}
                    name="province"
                    value={newAddress.province}
                    onChange={handleInputChange}
                    disabled={loading || provinces.length === 0}
                    required
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces.map(province => (
                      <option key={province.id || province.code} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Quận/Huyện <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${error && !newAddress.district ? 'is-invalid' : ''}`}
                      name="district"
                      value={newAddress.district}
                      onChange={handleInputChange}
                      disabled={loading || !newAddress.province || districts.length === 0}
                      required
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map(district => (
                        <option key={district.id || district.code} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phường/Xã <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${error && !newAddress.ward ? 'is-invalid' : ''}`}
                      name="ward"
                      value={newAddress.ward}
                      onChange={handleInputChange}
                      disabled={loading || !newAddress.district || wards.length === 0}
                      required
                    >
                      <option value="">Chọn Phường/Xã</option>
                      {wards.map(ward => (
                        <option key={ward.id || ward.code} value={ward.name}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Địa chỉ cụ thể <span className="text-danger">*</span></label>
                  <textarea
                    className={`form-control ${error && !newAddress.streetAddress.trim() ? 'is-invalid' : ''}`}
                    name="streetAddress"
                    value={newAddress.streetAddress}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực..."
                    disabled={loading}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Loại địa chỉ:</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="addressType" id="homeAddress" value="home" checked={newAddress.addressType === "home"} onChange={handleInputChange} disabled={loading} />
                      <label className="form-check-label" htmlFor="homeAddress">Nhà Riêng</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="addressType" id="officeAddress" value="office" checked={newAddress.addressType === "office"} onChange={handleInputChange} disabled={loading} />
                      <label className="form-check-label" htmlFor="officeAddress">Văn Phòng</label>
                    </div>
                  </div>
                </div>

                <div className="mb-3 d-flex flex-column flex-sm-row gap-3 gap-sm-5">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="isDefault" id="defaultAddress" checked={newAddress.isDefault} onChange={handleInputChange} disabled={loading} />
                    <label className="form-check-label" htmlFor="defaultAddress">Đặt làm địa chỉ mặc định</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="isPickupAddress" id="pickupAddress" checked={newAddress.isPickupAddress} onChange={handleInputChange} disabled={loading} />
                    <label className="form-check-label" htmlFor="pickupAddress">Đặt làm địa chỉ lấy hàng</label>
                  </div>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onHide}
                disabled={loading}
              >
                Trở Lại
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleSave}
                disabled={isSaveDisabled}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang lưu...
                  </>
                ) : (
                  'Hoàn thành'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressNewModal;