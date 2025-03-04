import React, { useState } from "react";
import PaymentModal from "../Modals/PaymentModal";

const CheckoutPayment = ({ selectedMethodId = "cod", onPaymentChange }) => {
  const [showModal, setShowModal] = useState(false);

  // Danh sách phương thức thanh toán
  const paymentMethods = {
    cod: {
      id: "cod",
      name: "Thanh toán khi nhận hàng",
      description: "Thanh toán bằng tiền mặt khi nhận hàng",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cash text-success" viewBox="0 0 16 16">
          <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H3z"/>
        </svg>
      )
    },
    bank: {
      id: "bank",
      name: "Chuyển khoản trực tiếp",
      description: "Thanh toán qua tài khoản ngân hàng",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bank text-primary" viewBox="0 0 16 16">
          <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zm2.5 0v7h1V7h-1zm2 7v-7h-1v7h1zm-9.5 1h7.5v-1h-7.5v1z"/>
        </svg>
      )
    }
  };

  // Lấy thông tin phương thức thanh toán đang được chọn
  const selectedMethod = paymentMethods[selectedMethodId] || paymentMethods.cod;

  // Xử lý khi chọn phương thức thanh toán mới
  const handleSelectPaymentMethod = (methodId) => {
    onPaymentChange(methodId);
    setShowModal(false);
  };

  return (
    <>
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-medium m-0">Phương thức thanh toán</h5>
            <button 
              className="btn btn-link text-primary p-0 text-decoration-none text-uppercase small fw-medium"
              onClick={() => setShowModal(true)}
            >
              Thay đổi
            </button>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <div className="me-2">
                {selectedMethod.icon}
              </div>
              <div className="text-secondary">{selectedMethod.name}</div>
            </div>
            <div className="small text-secondary mt-1 ms-4">{selectedMethod.description}</div>
          </div>
        </div>
      </div>
      
      {/* Modal chọn phương thức thanh toán */}
      {showModal && (
        <PaymentModal
          show={showModal}
          onHide={() => setShowModal(false)}
          selectedMethodId={selectedMethodId}
          paymentMethods={paymentMethods}
          onSelectMethod={handleSelectPaymentMethod}
        />
      )}
    </>
  );
};

export default CheckoutPayment;