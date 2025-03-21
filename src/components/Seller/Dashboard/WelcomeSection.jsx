import React from 'react';

const WelcomeSection = ({ shopName }) => {
  return (
    <div className="bg-light p-4 rounded mb-4 shadow-sm">
      <h2 className="mb-3">Xin chào,</h2>
      <h3 className="text-primary mb-3">{shopName}</h3>
      <p className="mb-3">Đây là tổng quan về cửa hàng của bạn hôm nay. Xem các thống kê cùng một lúc.</p>
    </div>
  );
};

export default WelcomeSection;