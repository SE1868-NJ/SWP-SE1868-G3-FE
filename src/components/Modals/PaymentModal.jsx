import React from "react";

const PaymentModal = ({ 
  show, 
  onHide, 
  selectedMethodId, 
  paymentMethods, 
  onSelectMethod 
}) => {
  // Nếu modal không hiển thị, không render gì cả
  if (!show) return null;

  // Convert đối tượng paymentMethods thành mảng để dễ dàng lặp qua
  const methodsArray = Object.values(paymentMethods);

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="modal-backdrop show" 
        style={{ opacity: 0.5 }}
        onClick={onHide}
      ></div>
      
      {/* Modal Dialog */}
      <div 
        className="modal show d-block" 
        tabIndex="-1" 
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Chọn phương thức thanh toán</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onHide}
                aria-label="Close"
              ></button>
            </div>
            
            <div className="modal-body">
              {methodsArray.map((method) => (
                <div 
                  key={method.id}
                  className={`card mb-3 cursor-pointer ${selectedMethodId === method.id ? 'border-primary' : ''}`}
                  onClick={() => onSelectMethod(method.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id={`payment-${method.id}`}
                        checked={selectedMethodId === method.id}
                        onChange={() => onSelectMethod(method.id)}
                      />
                      <label 
                        className="form-check-label w-100" 
                        htmlFor={`payment-${method.id}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex align-items-center">
                          <div className="me-3">
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

              {/* Thông tin thêm về phương thức thanh toán */}
              {selectedMethodId === 'bank' && (
                <div className="alert alert-info small">
                  <strong>Lưu ý:</strong> Sau khi đặt hàng, bạn sẽ được chuyển đến trang thanh toán với thông tin chuyển khoản và hướng dẫn chi tiết.
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onHide}
              >
                Hủy bỏ
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
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