import React from 'react';

const WelcomeSection = ({ shopName }) => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('vi-VN', options);

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4" style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #dbe4f0 100%)',
            borderRadius: '0.375rem'
          }}>
            <div>
              <h2 className="fw-bold text-dark mb-2">Xin chào, {shopName}!</h2>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-calendar-check me-2" style={{ color: '#334155' }}></i>
                <span className="text-dark">{formattedDate}</span>
              </div>
              <div className="d-flex align-items-start">
                <p className="text-dark mb-0">
                  Đây là tổng quan về cửa hàng của bạn hôm nay. Xem các thống kê cùng một lúc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;