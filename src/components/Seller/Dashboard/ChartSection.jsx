import React from 'react';
import RevenueChart from './RevenueChart';

const ChartSection = ({ data, timeRange, onTimeRangeChange, loading }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center bg-white">
        <h4 className="mb-0 fw-bold" style={{ color: '#2c3e50' }}>Tổng Quan Doanh Thu & Đơn Hàng</h4>
        <div>
          <select
            className="form-select form-select-sm"
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            disabled={loading}
            style={{ minWidth: '120px', borderColor: '#34495e' }}
          >
            <option value="today">Hôm nay</option>
            <option value="yesterday">Hôm qua</option>
            <option value="week">7 ngày qua</option>
            <option value="month">Tháng này</option>
          </select>
        </div>
      </div>
      <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <div className="spinner-border" role="status" style={{ color: '#34495e' }}>
              <span className="visually-hidden">Đang tải...</span>
            </div>
          </div>
        ) : (
          <RevenueChart data={data} />
        )}
      </div>
    </div>
  );
};

export default ChartSection;
