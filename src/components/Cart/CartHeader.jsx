import React from "react";

const CartHeader = ({ totalItems }) => {
  return (
    <div className="row fw-bold border-bottom pb-2 mb-3 g-0">
      <div className="col-5">Tất cả ({totalItems} sản phẩm)</div>
      <div className="col-2 text-center">Đơn giá</div>
      <div className="col-2 text-center">Số lượng</div>
      <div className="col-2 text-end">Thành tiền</div>
      <div className="col-1 text-center">Xóa</div>
    </div>
  );
};

export default CartHeader;
