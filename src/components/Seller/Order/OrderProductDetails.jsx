import React from 'react';

const OrderProductDetails = ({ orderDetails, orderId }) => {
  return (
    <table className="table table-sm mb-0">
      <thead>
        <tr>
          <th>MÃ SẢN PHẨM</th>
          <th>TÊN SẢN PHẨM</th>
          <th>HÌNH ẢNH</th>
          <th>SỐ LƯỢNG</th>
          <th>ĐƠN GIÁ</th>
          <th>THÀNH TIỀN</th>
        </tr>
      </thead>
      <tbody>
        {orderDetails && orderDetails[orderId] ? (
          orderDetails[orderId].map(detail => (
            <tr key={detail.id}>
              <td>{detail.product_id}</td>
              <td>{detail.product_name}</td>
              <td>
                <img
                  src={detail.image || "https://via.placeholder.com/80x80"}
                  alt="Sản phẩm"
                  width="80"
                  height="80"
                  className="img-thumbnail"
                />
              </td>
              <td>{detail.quantity}</td>
              <td>{detail.price.toLocaleString()}₫</td>
              <td>{detail.subtotal.toLocaleString()}₫</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
              Đang tải chi tiết đơn hàng...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderProductDetails;