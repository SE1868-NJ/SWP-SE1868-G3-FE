import React from "react";

const CheckoutShipping = ({ shippingFee, formatCurrency, setShowShippingModal }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span className="text-secondary">Phương thức vận chuyển:</span>
            <span className="fw-medium ms-2">Nhanh</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="me-4 small text-secondary">Nhận hàng vào 4 Tháng 3 - 5 Tháng 3</span>
            <span className="me-2">{formatCurrency(shippingFee)}</span>
            <button 
              className="btn btn-link text-primary p-0 text-decoration-none small"
              onClick={() => setShowShippingModal(true)}
            >
              Thay Đổi
            </button>
          </div>
        </div>
        
        <div className="mt-3 d-flex align-items-center text-success small">
          <span>Hoặc chọn phương thức Hỏa Tốc để</span>
          <button className="btn btn-link text-success p-0 text-decoration-none d-flex align-items-center ms-1 small fw-medium">
            <span>Nhận hàng vào ngày mai</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ms-1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="mt-3 d-flex align-items-center">
          <span className="text-secondary">Được đồng kiểm:</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ms-1 text-secondary">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CheckoutShipping;