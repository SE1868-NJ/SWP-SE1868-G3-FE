import React, { useState } from "react";
import avt from "../assets/images/avt.jpg";

const Checkout = () => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [products] = useState([
    { name: "MeXueMeILin Ao sweater", price: 150000, quantity: 1 },
  ]);
  const [shippingFee, setShippingFee] = useState(432800);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const totalAmount =
    products.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    shippingFee;

  const handlePlaceOrder = () => {
    alert("Đặt hàng thành công!");
  };

  return (
    <div className="container py-4">
      {/* Phần Địa chỉ */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h2 className="h4 mb-2 fw-bold text-dark">Địa Chỉ Nhận Hàng</h2>
              <div className="text-dark">
                <p className="mb-1 fw-semibold">Thu An (+84) 963780216</p>
                <p className="text-muted small">
                  Tòa nhà Moon skylromes-khu TĐC Bắc phú cát (gần tòa phenikaa),
                  <br />
                  Xã Thạch Hòa, Huyện Thạch Thất, Hà Nội
                </p>
              </div>
            </div>
            <div>
              <button className="btn btn-outline-danger btn-sm me-2" disabled>
                Mặc Định
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setShowAddressModal(true)}
              >
                Thay Đổi
              </button>
            </div>
          </div>

          <hr className="my-4" />

          {/* Danh sách sản phẩm */}
          <h5 className="h5 mb-3 fw-bold text-dark">Sản phẩm</h5>
          <div className="list-group">
            {products.map((product, index) => (
              <div key={index} className="list-group-item border-0 px-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={avt}
                      alt="product"
                      className="img-fluid me-3"
                      style={{ width: "5em" }}
                    />
                    <div>
                      <h6 className="mb-1 fw-semibold">{product.name}</h6>
                      <small className="text-muted">
                        Số lượng: {product.quantity}
                      </small>
                    </div>
                  </div>
                  <span className="text-danger fw-bold">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Voucher và vận chuyển */}
          <div className="row mt-4 g-3">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Voucher của Shop
                </label>
                <select
                  className="form-select"
                  value={selectedVoucher}
                  onChange={(e) => setSelectedVoucher(e.target.value)}
                >
                  <option value="">Chọn Voucher</option>
                  <option value="voucher1">Giảm 10%</option>
                  <option value="voucher2">Giảm 50.000đ</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border p-3 rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-semibold mb-0">Phương thức vận chuyển</h6>
                    <small className="text-success fw-semibold">Nhanh</small>
                  </div>
                  <div>
                    <span className="text-danger fw-bold me-3">
                      {formatCurrency(shippingFee)}
                    </span>
                    <button
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => setShowShippingModal(true)}
                    >
                      Thay Đổi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="row mt-4">
            <div className="col-12 text-end">
              <div className="bg-light p-3 rounded">
                <h4 className="fw-bold">
                  Tổng thanh toán ({products.length} sản phẩm):
                  <span className="text-danger ms-2">
                    {formatCurrency(totalAmount)}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần Thanh toán */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h4 mb-4 fw-bold text-dark">Phương thức thanh toán</h2>

          <div className="mb-4">
            <div className="border rounded p-3 mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="shopeePay"
                  defaultChecked
                />
                <label
                  className="form-check-label fw-semibold"
                  htmlFor="shopeePay"
                >
                  Ví ShopeePay
                </label>
                <p className="text-muted small mb-0">Thẻ Tín dụng/Ghi nợ</p>
              </div>
            </div>

            <div className="border rounded p-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="cod"
                />
                <label className="form-check-label fw-semibold" htmlFor="cod">
                  Thanh toán khi nhận hàng
                </label>
              </div>
            </div>
          </div>

          <button
            className="btn btn-danger w-100 fw-bold py-3"
            onClick={handlePlaceOrder}
          >
            Đặt hàng
          </button>

          <p className="text-muted small mt-3 text-center">
            Nhấn “Đặt hàng” đồng nghĩa với việc bạn đồng ý tuân theo
            <a href="#terms" className="text-decoration-none">
              {" "}
              Điều khoản Shopee
            </a>
          </p>
        </div>
      </div>

      {/* Modals */}
      <div
        className={`modal ${showAddressModal ? "show" : ""}`}
        style={{ display: showAddressModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Thay đổi địa chỉ</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAddressModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Địa chỉ mới</label>
                  <textarea className="form-control" rows="3"></textarea>
                </div>
                <button className="btn btn-primary">Lưu thay đổi</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showAddressModal ? "show" : ""}`}
        style={{ display: showAddressModal ? "block" : "none" }}
      ></div>

      <div
        className={`modal ${showShippingModal ? "show" : ""}`}
        style={{ display: showShippingModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Chọn phương thức vận chuyển</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowShippingModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shipping"
                  id="fast"
                  defaultChecked
                  onChange={() => setShippingFee(432800)}
                />
                <label className="form-check-label" htmlFor="fast">
                  Giao hàng nhanh - 432.800đ
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shipping"
                  id="standard"
                  onChange={() => setShippingFee(320000)}
                />
                <label className="form-check-label" htmlFor="standard">
                  Giao hàng tiết kiệm - 320.000đ
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showShippingModal ? "show" : ""}`}
        style={{ display: showShippingModal ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default Checkout;
