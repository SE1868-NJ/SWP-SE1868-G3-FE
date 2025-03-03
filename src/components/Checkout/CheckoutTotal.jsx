import React from "react";

const CheckoutTotal = ({
  totalProductPrice,
  shippingFee,
  voucherDiscount,
  insuranceFee = 0,
  totalAmount,
  formatCurrency,
}) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between py-1">
          <span className="text-secondary">Tổng tiền hàng</span>
          <span>{formatCurrency(totalProductPrice)}</span>
        </div>
        <div className="d-flex justify-content-between py-1">
          <span className="text-secondary">Tổng tiền phí vận chuyển</span>
          <span>{formatCurrency(shippingFee)}</span>
        </div>
        <div className="d-flex justify-content-between py-1">
          <span className="text-secondary">Tổng cộng Voucher giảm giá</span>
          <span className="text-secondary">-{formatCurrency(voucherDiscount)}</span>
        </div>
        <div className="d-flex justify-content-between py-1 border-top mt-2 pt-2">
          <span className="text-secondary">Tổng thanh toán</span>
          <span className="fs-4 text-danger fw-medium">{formatCurrency(totalAmount)}</span>
        </div>
      </div>
      
      <div className="card-footer bg-white border-top d-flex justify-content-between align-items-center">
        <div className="small text-secondary">
          Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo 
          <a href="#" className="text-primary ms-1">Điều khoản Shopee</a>
        </div>
        <button 
          className="btn btn-danger px-4"
          onClick={() => alert('Đặt hàng thành công!')}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default CheckoutTotal;