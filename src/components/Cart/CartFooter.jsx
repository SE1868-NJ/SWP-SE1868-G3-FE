import React from "react";
import { Link } from "react-router-dom";

const CartFooter = ({ selectAll, toggleSelectAll, totalQuantity, totalPrice, items }) => {
  return (
    <div className="container mt-4 border-top pt-3 bg-white fixed-bottom p-3 w-100 g-0">
      <div className="row w-100 text-center justify-content-center">
        <div className="col-md-5 d-flex align-items-center justify-content-start">
          <input type="checkbox" className="form-check-input me-2" checked={selectAll} onChange={toggleSelectAll} />
          <span>Chọn tất cả ({items.length})</span>
        </div>
        <div className="col-md-7 text-center">
          <div className="d-flex justify-content-center align-items-center">
            <span>Tổng thanh toán ({totalQuantity} sản phẩm):</span>
            <h4 className="mb-0 ms-3">{totalPrice.toLocaleString()}đ</h4>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <input type="text" className="form-control me-2" placeholder="Chợ làng voucher: Chọn hoặc nhập mã" style={{ maxWidth: "300px" }} />
            <Link to="/checkout" className="btn btn-danger px-4">
              Mua hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
