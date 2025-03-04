import React, { useState, useEffect } from "react";
import AddressModal from "../Modals/AddressModal";

const CheckoutAddress = ({ selectedAddressId, onSelectAddress }) => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Địa chỉ được chọn
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId) || {};
  
  // Lấy danh sách địa chỉ từ API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        
        // Dữ liệu mẫu
        setAddresses([
          {
            id: "1",
            name: "Trần xuân Đông",
            phone: "(+84) 823 133 258",
            streetAddress: "Số 47, Đường Nguyễn Tuân, Khu Goldseason",
            wardDistrict: "Phường Thanh Xuân Trung, Quận Thanh Xuân, Hà Nội",
            isDefault: true
          },
          {
            id: "2",
            name: "Trần Xuân Đông",
            phone: "(+84) 343 560 382",
            streetAddress: "90 Nguyễn Tuân",
            wardDistrict: "Phường Thanh Xuân Trung, Quận Thanh Xuân, Hà Nội",
            isDefault: false
          }
        ]);
        
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAddresses();
  }, []);
  
  // Xử lý thêm địa chỉ mới
  const handleAddNewAddress = async (newAddress) => {
    try {
      // Trong thực tế, bạn sẽ gọi API để thêm địa chỉ mới
      // const response = await axios.post(`${API_URL}/addresses`, newAddress);
      // const savedAddress = response.data;
      
      // Mô phỏng API
      const savedAddress = {
        ...newAddress,
        id: Date.now().toString()
      };
      
      // Cập nhật danh sách địa chỉ
      setAddresses(prev => [...prev, savedAddress]);
      
      // Chọn địa chỉ mới
      onSelectAddress(savedAddress.id);
      
    } catch (error) {
      console.error("Error adding new address:", error);
    }
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
              <div className="spinner-border spinner-border-sm text-secondary" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
              <span className="ms-2">Đang tải địa chỉ...</span>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      
      <AddressModal
        show={showModal}
        onHide={() => setShowModal(false)}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={onSelectAddress}
        onAddNewAddress={handleAddNewAddress}
      />
    </>
  );
};

export default CheckoutAddress;