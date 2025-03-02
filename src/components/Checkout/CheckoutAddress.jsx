import React, { useState } from "react";
import AddressModal from "../Modals/AddressModal";

const CheckoutAddress = ({ setShowAddressModal }) => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      name: "Trần xuân Đông",
      phone: "(+84) 823 133 258",
      streetAddress: "Số 47, Đường Nguyễn Tuân, Khu Goldseason",
      wardDistrict: "Phường Thanh Xuân Trung, Quận Thanh Xuân, Hà Nội",
      isDefault: true,
      isPickupAddress: false
    },
    {
      id: "2",
      name: "Trần Xuân Đông",
      phone: "(+84) 343 560 382",
      streetAddress: "90 Nguyễn Tuân",
      wardDistrict: "Phường Thanh Xuân Trung, Quận Thanh Xuân, Hà Nội",
      isDefault: false,
      isPickupAddress: true
    },
    {
      id: "3",
      name: "Trần xuân đông",
      phone: "(+84) 334 887 589",
      streetAddress: "Hh 2, Chung Cư, Số 90, Nguyễn Tuân Nguyễn Tuân",
      wardDistrict: "Phường Thanh Xuân Trung, Quận Thanh Xuân, Hà Nội",
      isDefault: false,
      isPickupAddress: false
    }
  ]);
  
  const [selectedAddressId, setSelectedAddressId] = useState("1");
  
  // Get currently selected address
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId) || addresses[0];
  
  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };
  
  const handleAddNewAddress = (newAddress) => {
    // Add the new address to the list
    setAddresses([...addresses, newAddress]);
    
    // If the new address is set as default, update all other addresses
    if (newAddress.isDefault) {
      setAddresses(prevAddresses => 
        prevAddresses.map(addr => 
          addr.id !== newAddress.id ? { ...addr, isDefault: false } : addr
        )
      );
    }
    
    // Select the new address
    setSelectedAddressId(newAddress.id);
  };

  return (
    <>
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="text-danger me-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="text-danger fw-medium">Địa Chỉ Nhận Hàng</div>
          </div>
          
          <div className="mt-2 d-flex align-items-center justify-content-between">
            <div>
              <span className="fw-medium">{selectedAddress.name} {selectedAddress.phone}</span>
              <span className="mx-2 text-secondary">|</span>
              <span className="text-secondary">
                {selectedAddress.streetAddress} <br />
                {selectedAddress.wardDistrict}
              </span>
            </div>
            <div className="d-flex align-items-center">
              {selectedAddress.isDefault && (
                <span className="badge border border-danger text-danger bg-white me-2" style={{ fontSize: '0.75rem' }}>Mặc Định</span>
              )}
              <button 
                className="btn btn-link text-primary p-0 text-decoration-none"
                style={{ fontSize: '0.875rem' }}
                onClick={() => setShowModal(true)}
              >
                Thay Đổi
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <AddressModal
        show={showModal}
        onHide={() => setShowModal(false)}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={handleSelectAddress}
        onAddNewAddress={handleAddNewAddress}
      />
    </>
  );
};

export default CheckoutAddress;