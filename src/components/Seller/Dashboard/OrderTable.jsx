import React from 'react';

const getStatusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-success';
    case 'processing':
      return 'bg-warning text-dark';
    case 'new':
      return 'bg-info';
    case 'cancelled':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Hoàn Thành';
    case 'processing':
      return 'Đang Xử Lý';
    case 'new':
      return 'Mới';
    case 'cancelled':
      return 'Đã Hủy';
    default:
      return 'Không Xác Định';
  }
};

const OrderTable = ({ orders }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center bg-white">
        <h5 className="mb-0">Đơn Hàng Gần Đây</h5>
        <a href="#" className="btn btn-sm btn-outline-primary">Xem Tất Cả</a>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Mã Đơn</th>
                <th>Khách Hàng</th>
                <th>Tổng Tiền</th>
                <th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span className={`badge ${getStatusClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;