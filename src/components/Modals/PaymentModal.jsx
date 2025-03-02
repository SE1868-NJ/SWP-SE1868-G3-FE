import React from "react";

const PaymentModal = ({ show, onHide, selectedMethod, onSelectMethod }) => {
  if (!show) return null;

  const paymentMethods = [
    {
      id: "cod",
      name: "Thanh toán khi nhận hàng",
      description: "Thanh toán bằng tiền mặt khi nhận hàng",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
          <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H3z"/>
        </svg>
      )
    },
    {
      id: "bank",
      name: "Chuyển khoản trực tiếp",
      description: "Thanh toán qua tài khoản ngân hàng",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bank" viewBox="0 0 16 16">
          <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zm2.5 0v7h1V7h-1zm2 7v-7h-1v7h1zm-9.5 1h7.5v-1h-7.5v1z"/>
        </svg>
      )
    }
  ];

  const handleSelect = (methodId) => {
    onSelectMethod(methodId);
    onHide();
  };

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Phương thức thanh toán</h5>
              <button type="button" className="btn-close" onClick={onHide}></button>
            </div>
            <div className="modal-body">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id} 
                  className={`card mb-3 cursor-pointer ${selectedMethod === method.id ? 'border-primary' : ''}`}
                  onClick={() => handleSelect(method.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id={`payment-${method.id}`}
                        checked={selectedMethod === method.id}
                        onChange={() => handleSelect(method.id)}
                      />
                      <label className="form-check-label w-100" htmlFor={`payment-${method.id}`}>
                        <div className="d-flex align-items-center">
                          <div className="text-primary me-3">
                            {method.icon}
                          </div>
                          <div>
                            <div className="fw-medium">{method.name}</div>
                            <div className="text-secondary small">{method.description}</div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
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
    </>
  );
};

export default PaymentModal;