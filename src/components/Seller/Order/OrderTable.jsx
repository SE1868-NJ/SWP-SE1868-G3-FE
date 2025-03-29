import React from 'react';
import OrderProductDetails from './OrderProductDetails';

const OrderTable = ({
  orders,
  loading,
  error,
  selectedOrderId,
  toggleOrderDetails,
  handleStatusChange
}) => {

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: '50px' }}></th>

            <th>MÃ ĐH</th>
            <th className="d-none d-md-table-cell">PHƯƠNG THỨC</th>

            <th>TÊN KH</th>
            <th className="d-none d-lg-table-cell">SĐT</th>
            <th className="d-none d-lg-table-cell text-truncate" style={{ maxWidth: '150px' }}>ĐỊA CHỈ</th>
            <th>TỔNG TIỀN</th>
            <th>TRẠNG THÁI ĐH</th>
            <th className="d-none d-md-table-cell">TRẠNG THÁI TT</th>
            <th className="d-none d-sm-table-cell">NGÀY TẠO</th>
            <th style={{ minWidth: '120px' }}>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.order_id}>
              <tr>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{ width: '28px', height: '28px' }}
                    onClick={() => toggleOrderDetails(order.order_id)}
                    aria-label={selectedOrderId === order.order_id ? 'Ẩn chi tiết' : 'Hiện chi tiết'}
                  >
                    <i className={`bi ${selectedOrderId === order.order_id ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </button>
                </td>
                <td className="fw-medium">{order.order_id}</td>
                <td className="d-none d-md-table-cell">{order.payment_method}</td>
                <td>{order.full_name}</td>
                <td className="d-none d-lg-table-cell">{order.Address.phone_number}</td>
                <td className="d-none d-lg-table-cell text-truncate" style={{ maxWidth: '150px' }} title={order.Address.street_address}>{order.Address.street_address}</td>
                <td className="text-danger fw-medium">{order.total?.toLocaleString('vi-VN')}₫</td>

                <td>
                  <span className={`badge fs-xs ${order.status === 'PENDING' ? 'text-bg-warning' :
                    order.status === 'PROCESSING' ? 'text-bg-primary' :
                      order.status === 'SHIPPING' ? 'text-bg-info' :
                        order.status === 'COMPLETED' ? 'text-bg-success' :
                          order.status === 'CANCELLED' ? 'text-bg-danger' :
                            'text-bg-secondary'
                    }`}>
                    {order.status === 'PENDING' ? 'Chờ xử lý' :
                      order.status === 'PROCESSING' ? 'Đang xử lý' :
                        order.status === 'SHIPPING' ? 'Đang giao' :
                          order.status === 'COMPLETED' ? 'Hoàn thành' :
                            order.status === 'CANCELLED' ? 'Đã hủy' :
                              order.status
                    }
                  </span>
                </td>

                <td className="d-none d-md-table-cell">
                  <span className={`badge ${order.payment_status == 0 ? 'text-bg-secondary' : 'text-bg-success'}`}>
                    {order.payment_status == 0 ? "Chưa TT" : "Đã TT"}
                  </span>
                </td>

                <td className="d-none d-sm-table-cell small text-muted">
                  {new Date(order.created_at).toLocaleDateString('vi-VN')}
                </td>

                <td>
                  {(order.status !== 'COMPLETED' && order.status !== 'CANCELLED') ? (
                    <div className="dropdown">
                      <button className="btn btn-sm btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Xác nhận
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        {order.status === 'PENDING' && (
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleStatusChange(order.order_id, 'PROCESSING')}
                            >
                              <i className="bi bi-arrow-repeat me-2"></i> Xử lý đơn
                            </button>
                          </li>
                        )}
                        {(order.status === 'PROCESSING' || order.status === 'SHIPPING') && (
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleStatusChange(order.order_id, 'COMPLETED')}
                            >
                              <i className="bi bi-check-circle me-2"></i> Hoàn thành
                            </button>
                          </li>
                        )}
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleStatusChange(order.order_id, 'CANCELLED')}
                          >
                            <i className="bi bi-x-circle me-2"></i> Hủy đơn hàng
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <span className='text-muted fst-italic'>-</span>
                  )}
                </td>
              </tr>
              {selectedOrderId === order.order_id && (
                <tr>
                  <td colSpan="11" className="p-0 border-0">
                    <div className="p-3 bg-light border-top border-bottom">
                      <h6 className="mb-3">Chi tiết sản phẩm:</h6>
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

export default OrderTable;