import React, { useState } from "react";
import avt from "../assets/images/avt.jpg";
const Checkout = () => {
  const [address, setAddress] = useState({
    name: "Họ và tên customer",
    phone: "Số điện thoại",
    location: "Địa chỉ nhận hàng",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);
  const [message, setMessage] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("standard");

  const totalPrice = 59000;
  const shippingFee = shippingMethod === "standard" ? 15000 : 30000;
  const voucherDiscount = selectedVoucher ? 10000 : 0; // Giảm 10.000đ nếu có voucher
  const finalTotal = totalPrice + shippingFee - voucherDiscount;

  const handleEdit = () => {
    setIsEditing(true);
    setTempAddress(address);
  };

  const handleSave = () => {
    setAddress(tempAddress);
    setIsEditing(false);
  };

  const handleVoucherSelection = () => {
    setSelectedVoucher(selectedVoucher ? null : "Giảm 10.000đ");
  };

  const [selectedMethod, setSelectedMethod] = useState("");

  const OrderSummary = ({ totalPrice, shippingFee, voucherDiscount }) => {
    const finalTotal = totalPrice + shippingFee - voucherDiscount;
  };
  return (
    <div className="container p-4">
      <h4 className="mb-4">Xác nhận thanh toán</h4>

      {/* Address Section */}
      <div
        className="card mb-4 p-3 rounded border"
        style={{
          backgroundColor: "white",
          border: "1px solid #dee2e6",
          boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="card-body">
          <h6 className="card-title">
            <span className="text-primary">●</span> Địa chỉ nhận hàng
          </h6>
          {isEditing ? (
            <div>
              <input
                type="text"
                className="form-control mb-2"
                value={tempAddress.name}
                onChange={(e) =>
                  setTempAddress({ ...tempAddress, name: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                value={tempAddress.phone}
                onChange={(e) =>
                  setTempAddress({ ...tempAddress, phone: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                value={tempAddress.location}
                onChange={(e) =>
                  setTempAddress({ ...tempAddress, location: e.target.value })
                }
              />
              <button className="btn btn-success me-2" onClick={handleSave}>
                Lưu
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Hủy
              </button>
            </div>
          ) : (
            <div className="row">
              <div className="col">
                <p className="mb-1">{address.name}</p>
                <p className="mb-0">
                  {address.phone} - {address.location}
                </p>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-danger px-3 py-1"
                  onClick={handleEdit}
                >
                  Thay đổi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Table */}
      <div className="mb-4">
        {/* Table Header */}
        <div className="row fw-bold border-bottom mb-2">
          <div className="col-5 text-start">Sản phẩm</div>
          <div className="col-2 text-end">Đơn giá</div>
          <div className="col-2 text-end">Số lượng</div>
          <div className="col-3 text-end">Thành tiền</div>
        </div>

        {/* Product Row */}
        <div className="row mb-2 align-items-center">
          <div className="col-5 d-flex align-items-center">
            <img
              src={avt}
              alt="Sản phẩm"
              className="img me-2"
              width="50"
              height="50"
            />
            <span>Tên sản phẩm</span>
          </div>
          <div className="col-2 text-end">59.000</div>
          <div className="col-2 text-end">1</div>
          <div className="col-3 text-end">59.000</div>
        </div>
      </div>

      {/* Voucher Section */}
      <div className="mb-4 d-flex justify-content-between align-items-center border-bottom pb-2">
        <div className="d-flex align-items-center ms-auto">
          {" "}
          {/* Căn lề phải */}
          <i className="bi bi-ticket-perforated text-danger me-2"></i>
          <span className="text-dark me-5">
            Voucher của shop {selectedVoucher && `- ${selectedVoucher}`}
          </span>
        </div>
        <button
          className="text-danger border-0 bg-transparent fw-bold"
          onClick={handleVoucherSelection}
        >
          Chọn voucher
        </button>
      </div>

      {/* Message & Shipping Method on the same row */}
      <div className="row mb-4">
        {/* Message Section */}
        <div className="col-md-6 d-flex align-items-center">
          <label htmlFor="message" className="form-label me-2">
            Lời nhắn:
          </label>
          <input
            type="text"
            id="message"
            className="form-control"
            placeholder="Lưu ý cho Người bán..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ maxWidth: "70%" }} // Điều chỉnh độ rộng của input
          />
        </div>

        {/* Shipping Method Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-end">
          <span className="me-2">Phương thức vận chuyển:</span>
          <select
            className="form-select"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
            style={{ maxWidth: "50%" }} // Điều chỉnh độ rộng của select
          >
            <option value="standard">Vận chuyển thường - 15.000đ</option>
            <option value="express">Vận Chuyển Nhanh - 30.000đ</option>
          </select>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-4 border-top pt-2">
        {/* Dòng đầu tiên: Chọn phương thức thanh toán */}
        <div className="d-flex align-items-center mb-2">
          <div className="fw-bold me-3">Phương thức thanh toán:</div>
          <div>
            <button
              className={`btn me-2 ${
                selectedMethod === "Thanh toán khi nhận hàng"
                  ? "btn-outline-danger"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setSelectedMethod("Thanh toán khi nhận hàng")}
            >
              Thanh toán khi nhận hàng
            </button>
            <button
              className={`btn ${
                selectedMethod === "Ví điện tử"
                  ? "btn-outline-danger"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setSelectedMethod("Ví điện tử")}
            >
              Ví điện tử
            </button>
          </div>
        </div>
      </div>

      {/* Total Section */}
      <div className="border-top pt-3 border-bottom pb-3">
        <div className="d-flex flex-column align-items-end">
          <div className="d-flex justify-content-between w-50">
            <span>Tổng tiền hàng:</span>
            <span>{totalPrice.toLocaleString()}d</span>
          </div>
          <div className="d-flex justify-content-between w-50">
            <span>Tổng tiền phí vận chuyển:</span>
            <span>{shippingFee.toLocaleString()}d</span>
          </div>
          <div className="d-flex justify-content-between w-50">
            <span>Giảm giá voucher:</span>
            <span>{voucherDiscount.toLocaleString()}d</span>
          </div>
          <div className="d-flex justify-content-between w-50 fw-bold">
            <span>Tổng thanh toán:</span>
            <span>{finalTotal.toLocaleString()}d</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4">
        <p className="small text-muted">
          Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản
          chợ làng.
        </p>
        <button className="btn btn-danger w-100 py-2">Đặt hàng</button>
      </div>
    </div>
  );
};

export default Checkout;
