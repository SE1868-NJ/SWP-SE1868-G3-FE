import React from 'react';
import OrderProductDetails from './OrderProductDetails';

const DeliveryTable = ({
  orders,
  loading,
  error,
  selectedOrderId,
  toggleOrderDetails,
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
            <th>SHIPPER</th>
            <th>TÊN KHÁCH HÀNG</th>
            <th>SĐT</th>
            <th>ĐỊA CHỈ</th>
            <th>TỔNG TIỀN</th>
            <th>TRẠNG THÁI</th>
            <th>NGÀY TẠO</th>
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
                <td>SHIP1</td>
                <td>{order.full_name}</td>
                <td>{order.phone}</td>
                <td className="text-truncate" style={{ maxWidth: '150px' }}>{order.address}</td>
                <td>{order.total}₫</td>
                <td>
                  <span className={`badge ${order.status === 'PENDING' ? 'bg-warning' :
                    order.status === 'PROCESSING' ? 'bg-primary' :
                        order.status === 'DELIVERY' ? 'bg-info' :
                            order.status === 'COMPLETED' ? 'bg-success' :
                                'bg-danger'
                    }`}>
                    {order.status === 'PENDING' ? 'Chờ xử lý' :
                      order.status === 'PROCESSING' ? 'Đang xử lý' :
                        order.status === 'DELIVERY' ? 'Đang giao' :    
                            order.status === 'COMPLETED' ? 'Hoàn thành' :
                            'Đã hủy'}
                  </span>
                </td>
                <td>{order.created_at}</td>
              </tr>
              {selectedOrderId === order.order_id && (
                <tr>
                  <td colSpan="11" className="border-0 p-0">
                    <div className="px-4 py-3 bg-light">
                      <OrderProductDetails
                        orderDetails={order.OrderDetails || []}
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

export default DeliveryTable;
