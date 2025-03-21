import React from 'react';

const StatCards = ({ stats }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-6 col-lg-6 mb-4 mb-lg-0">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body d-flex align-items-center" style={{ backgroundColor: '#f8fafc' }}>
            <div className="d-flex align-items-center justify-content-center me-4" style={{
              backgroundColor: '#334155',
              width: '80px',
              height: '80px',
              borderRadius: '50%'
            }}>
              <i className="bi bi-box-seam text-white" style={{ fontSize: '2rem' }}></i>
            </div>
            <div>
              <h2 className="display-6 fw-bold mb-0" style={{ color: '#334155' }}>{stats.totalOrders}</h2>
              <p className="text-muted mb-0">Tổng Đơn Hàng</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-6">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body d-flex align-items-center" style={{ backgroundColor: '#f8fafc' }}>
            <div className="d-flex align-items-center justify-content-center me-4" style={{
              backgroundColor: '#334155',
              width: '80px',
              height: '80px',
              borderRadius: '50%'
            }}>
              <i className="bi bi-basket text-white" style={{ fontSize: '2rem' }}></i>
            </div>
            <div>
              <h2 className="display-6 fw-bold mb-0" style={{ color: '#334155' }}>{stats.totalProducts}</h2>
              <p className="text-muted mb-0">Tổng Sản Phẩm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
