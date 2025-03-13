import React, { useState } from "react";
import AddressNewModal from "./AddressNewModal";

const AddressModal = ({ 
  show, 
  onHide, 
  addresses, 
  selectedAddressId,
  onSelectAddress,
  onAddNewAddress 
}) => {
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);
  
  const handleAddressSelect = (addressId) => {
    onSelectAddress(addressId);
    onHide();
  };

  const handleAddNewAddress = (newAddress) => {
    onAddNewAddress(newAddress);
    setShowNewAddressModal(false);
  };
  
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title">Địa Chỉ Của Tôi</h5>
              <button type="button" className="btn-close" onClick={onHide}></button>
            </div>
            <div className="modal-body">
              {addresses.map((address) => (
                <div key={address.id} className="mb-3 pb-3 border-bottom">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="addressRadio" 
                      id={`address-${address.id}`}
                      checked={selectedAddressId === address.id}
                      onChange={() => handleAddressSelect(address.id)}
                    />
                    <label className="form-check-label w-100" htmlFor={`address-${address.id}`}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="fw-medium">{address.name} {address.phone}</div>
                          <div className="text-secondary">
                            {address.streetAddress}
                            <br />
                            {address.wardDistrict}
                          </div>
                          {address.isDefault && (
                            <span className="badge border border-danger text-danger bg-white me-2 mt-2">Mặc định</span>
                          )}
                          {address.isPickupAddress && (
                            <span className="badge border border-secondary text-secondary bg-white mt-2">Địa chỉ lấy hàng</span>
                          )}
                        </div>
                        <div>
                          <button 
                            className="btn btn-link text-primary p-0 text-decoration-none"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            Cập nhật
                          </button>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              ))}
              
              <div className="d-grid mt-3">
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => setShowNewAddressModal(true)}
                >
                  <i className="bi bi-plus"></i> Thêm Địa Chỉ Mới
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>Huỷ</button>
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={() => {
                  if (selectedAddressId) {
                    onHide();
                  }
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <AddressNewModal 
        show={showNewAddressModal}
        onHide={() => setShowNewAddressModal(false)}
        onSave={handleAddNewAddress}
      />
    </>
  );
};

export default AddressModal;