import React, { useState } from "react";

const AddressNewModal = ({ show, onHide, onSave }) => {
  const [newAddress, setNewAddress] = useState({
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSave = () => {
    // Create a complete address object with id and formatted strings for display
    const completeAddress = {
      ...newAddress,
      id: Date.now().toString(), // Generate a unique ID
      wardDistrict: `Phường ${newAddress.ward}, Quận ${newAddress.district}, ${newAddress.province}`
    };
    
    onSave(completeAddress);
    
    // Reset form
    setNewAddress({
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
  };
  
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1060 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Địa chỉ mới</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                    placeholder="Họ và tên"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    placeholder="Số điện thoại"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Tỉnh/Thành phố, Quận/Huyện, Phường/Xã</label>
                <select 
                  className="form-select" 
                  name="province"
                  value={newAddress.province}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                </select>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <select 
                    className="form-select" 
                    name="district"
                    value={newAddress.district}
                    onChange={handleInputChange}
                    disabled={!newAddress.province}
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    <option value="Thanh Xuân">Thanh Xuân</option>
                    <option value="Thạch Thất">Thạch Thất</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <select 
                    className="form-select" 
                    name="ward"
                    value={newAddress.ward}
                    onChange={handleInputChange}
                    disabled={!newAddress.district}
                  >
                    <option value="">Chọn Phường/Xã</option>
                    <option value="Thanh Xuân Trung">Thanh Xuân Trung</option>
                    <option value="Tân Xã">Tân Xã</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Địa chỉ cụ thể</label>
                <textarea
                  className="form-control"
                  name="streetAddress"
                  value={newAddress.streetAddress}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Số nhà, tên đường..."
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Loại địa chỉ:</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="addressType"
                      id="homeAddress"
                      value="Nhà Riêng"
                      checked={newAddress.addressType === "Nhà Riêng"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="homeAddress">
                      Nhà Riêng
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="addressType"
                      id="officeAddress"
                      value="Văn Phòng"
                      checked={newAddress.addressType === "Văn Phòng"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="officeAddress">
                      Văn Phòng
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3 d-flex gap-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isDefault"
                    id="defaultAddress"
                    checked={newAddress.isDefault}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="defaultAddress">
                    Đặt làm địa chỉ mặc định
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isPickupAddress"
                    id="pickupAddress"
                    checked={newAddress.isPickupAddress}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="pickupAddress">
                    Đặt làm địa chỉ lấy hàng
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-outline-secondary" 
              onClick={onHide}
            >
              Trở Lại
            </button>
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={handleSave}
              disabled={!newAddress.name || !newAddress.phone || !newAddress.streetAddress || !newAddress.province || !newAddress.district || !newAddress.ward}
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressNewModal;