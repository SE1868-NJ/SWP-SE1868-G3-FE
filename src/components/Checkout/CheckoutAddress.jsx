import React, { useState, useEffect } from "react";
import AddressModal from "../Modals/AddressModal";
import { addressService } from "../../services/addressService";
import {useAuth} from "../../hooks/contexts/AuthContext";

const CheckoutAddress = ({ selectedAddressId, onSelectAddress }) => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useAuth();

  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId) || {};

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        const response = await addressService.getAddressesByUserId(user.id);
        if(response.status == 'success') {
          setAddresses(response.data);
        }

      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressAdded = (newlySavedAddress) => {
    try {
      setAddresses(prevAddresses => [...prevAddresses, newlySavedAddress]);

      onSelectAddress(newlySavedAddress.id);

      setShowModal(false); 

    } catch (error) {
      console.error("Error processing newly added address:", error);
    }
  };

  const handleSelectAndClose = (addressId) => {
    onSelectAddress(addressId);
    setShowModal(false);
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

          {isLoading ? (
            <div className="mt-2 d-flex justify-content-center">
               {/* ... Loading Spinner ... */}
               <div className="spinner-border spinner-border-sm text-secondary" role="status">
                 <span className="visually-hidden">Đang tải...</span>
               </div>
               <span className="ms-2">Đang tải địa chỉ...</span>
            </div>
          ) : !selectedAddressId || !selectedAddress.full_name ? (
             <div className="mt-2 d-flex align-items-center justify-content-between">
                 <span className="text-secondary">Vui lòng chọn hoặc thêm địa chỉ giao hàng.</span>
                 <button
                    className="btn btn-link text-primary p-0 text-decoration-none"
                    style={{ fontSize: '0.875rem' }}
                    onClick={() => setShowModal(true)}
                 >
                    Chọn Địa Chỉ
                 </button>
             </div>
          ) : (
            <div className="mt-2 d-flex align-items-center justify-content-between">
              <div>
                <span className="fw-medium">{selectedAddress.full_name} {selectedAddress.phone_number}</span>
                <span className="mx-2 text-secondary">|</span>
                <span className="text-secondary">
                  {selectedAddress.street_address} <br />
                  {selectedAddress.ward.name}
                </span>
              </div>
              <div className="d-flex align-items-center">
                {selectedAddress.is_default && (
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
          )}
        </div>
      </div>

      <AddressModal
        show={showModal}
        onHide={() => setShowModal(false)}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={handleSelectAndClose}
        onAddNewAddress={handleAddressAdded} 
      />
    </>
  );
};

export default CheckoutAddress;