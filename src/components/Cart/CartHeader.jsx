import React from "react";
import Checkbox from "./Checkbox";

const CartHeader = ({ totalItems, selectAll, toggleSelectAll }) => {
  return (
    <div className="row fw-bold border-bottom pb-2 mb-3 g-0 align-items-center">
      <div className="col-5 d-flex align-items-center">
        <Checkbox checked={selectAll} onChange={toggleSelectAll} className="me-2" />
        <span>Tất cả ({totalItems} sản phẩm)</span>
      </div>
      <div className="col-2 text-center">Đơn giá</div>
      <div className="col-2 text-center">Số lượng</div>
      <div className="col-2 text-center" style={{ width: "140px" }}>Số tiền</div>
      <div className="col-1 text-center" style={{ width: "110px" }}>Xóa</div>
    </div>
  );
};

export default CartHeader;