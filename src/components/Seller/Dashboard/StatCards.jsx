import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="col-md-6 mb-3">
      <div className={`card h-100 bg-${color} bg-gradient text-white shadow`}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6 className="card-title">{title}</h6>
            <h2 className="card-text">{value}</h2>
          </div>
          <div>
            <i className={`bi bi-${icon} fs-1`}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCards = ({ stats }) => {
  return (
    <div className="row mb-4">
      <StatCard
        title="Tổng Đơn Hàng"
        value={stats.totalOrders}
        icon="box-seam"
        color="primary"
      />
      <StatCard
        title="Tổng Sản Phẩm"
        value={stats.totalProducts}
        icon="bag"
        color="info"
      />
    </div>
  );
};

export default StatCards;