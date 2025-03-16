import React from 'react';
import OrderDetails from './OrderDetails'; // Import component OrderDetails

const OrderTable = ({
  orders,
  loading,
  error,
  selectedOrderId,
  toggleOrderDetails,
  handleStatusChange,
  orderType,
  orderDetails
}) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="h5 text-muted">Không có đơn hàng nào</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th></th>
            <th>MÃ ĐƠN HÀNG</th>
            <th>PHƯƠNG THỨC</th>
            <th>TÊN KHÁCH HÀNG</th>
            <th>SĐT</th>
            <th>ĐỊA CHỈ</th>
            <th>TỔNG TIỀN</th>
            <th>EMAIL</th>
            <th>TRẠNG THÁI</th>
            <th>NGÀY TẠO</th>
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.order_id}>
              <tr>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary rounded-circle"
                    onClick={() => toggleOrderDetails(order.order_id)}
                  >
                    <i className={`bi ${selectedOrderId === order.order_id ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </button>
                </td>
                <td>{order.order_id}</td>
                <td>{order.payment_method === "CASH ON DELIVERY" ? "THANH TOÁN KHI NHẬN HÀNG" :
                  order.payment_method === "CREDIT CARD" ? "THẺ TÍN DỤNG" :
                    order.payment_method === "PAYPAL" ? "PAYPAL" : order.payment_method}</td>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td className="text-truncate" style={{ maxWidth: '150px' }}>{order.address}</td>
                <td>{order.total.toLocaleString()}₫</td>
                <td>{order.email}</td>
                <td>
                  <span className={`badge ${order.status === 'pending' ? 'bg-warning' :
                    order.status === 'processing' ? 'bg-primary' :
                      order.status === 'completed' ? 'bg-success' :
                        'bg-danger'
                    }`}>
                    {order.status === 'pending' ? 'Chờ xử lý' :
                      order.status === 'processing' ? 'Đang xử lý' :
                        order.status === 'completed' ? 'Hoàn thành' :
                          'Đã hủy'}
                  </span>
                </td>
                <td>{order.created_at}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      <span>Xác nhận</span>
                    </button>
                    <ul className="dropdown-menu">
                      {orderType === 'new' && (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleStatusChange(order.order_id, 'processing')}
                          >
                            Xử lý đơn hàng
                          </button>
                        </li>
                      )}
                      {orderType === 'processing' && (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleStatusChange(order.order_id, 'completed')}
                          >
                            Hoàn thành đơn hàng
                          </button>
                        </li>
                      )}
                      {(orderType === 'new' || orderType === 'processing') && (
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleStatusChange(order.order_id, 'cancelled')}
                          >
                            Hủy đơn hàng
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>

              {/* Chi tiết đơn hàng - hiển thị trực tiếp dưới đơn hàng tương ứng */}
              {selectedOrderId === order.order_id && (
                <tr>
                  <td colSpan="11" className="border-0 p-0">
                    <div className="px-4 py-3 bg-light">
                      {/* Sử dụng component OrderDetails */}
                      <OrderDetails
                        orderDetails={orderDetails}
                        orderId={order.order_id}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;