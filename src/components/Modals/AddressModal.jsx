import React, { useState } from "react";
import AddressNewModal from "./AddressNewModal";

const AddressModal = ({
  show,
  onHide,
  addresses = [], 
  selectedAddressId,
  onSelectAddress, 
  onAddNewAddress  
}) => {
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);

  const handleAddressSelect = (addressId) => {
    onSelectAddress(addressId);
  };

  const handleNewAddressSaved = (newAddress) => {
    onAddNewAddress(newAddress);

    setShowNewAddressModal(false);

  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop show" style={{ zIndex: 1050 }}></div>
      <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title">Địa Chỉ Của Tôi</h5>
              <button type="button" className="btn-close" onClick={onHide}></button>
            </div>
            <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}> 
              {addresses.length === 0 && (
                <p className="text-center text-secondary">Bạn chưa có địa chỉ nào.</p>
              )}
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
                      value={address.id} 
                    />
                    <label className="form-check-label w-100" htmlFor={`address-${address.id}`}>
                      <div className="d-flex justify-content-between align-items-start"> 
                        <div>
                          <div className="fw-medium mb-1"> 
                             {address.full_name} <span className="fw-normal">{address.phone_number}</span> 
                          </div>
                          <div className="text-secondary small">
                            {address.street_address}
                            <br />
                            {address.ward.name} 
                          </div>
                          <div className="mt-2">
                              {address.is_default && (
                                <span className="badge border border-danger text-danger bg-white me-2">Mặc định</span>
                              )}
                              {address.is_pickup_address && (
                                <span className="badge border border-secondary text-secondary bg-white">Địa chỉ lấy hàng</span>
                              )}
                          </div>
                        </div>
                        <button
                          className="btn btn-link text-primary p-0 text-decoration-none mt-1"
                          style={{ fontSize: '0.8rem' }} 
                          onClick={(e) => {
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            alert(`Cập nhật cho địa chỉ ID: ${address.id}`);
                          }}
                        >
                          Cập nhật
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
              ))}

              <div className="d-grid mt-4">
                <button
                  className="btn btn-outline-primary" 
                  onClick={() => setShowNewAddressModal(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg me-1" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                  </svg>
                  Thêm Địa Chỉ Mới
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>Huỷ</button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onHide} 
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
        onSave={handleNewAddressSaved} 
      />
    </>
  );
};

export default AddressModal;