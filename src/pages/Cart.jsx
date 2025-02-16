import React, { useState } from "react";
import avt from "../assets/images/avt.jpg";
import { Link } from "react-router-dom";
const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Truyện tranh",
      price: 59600,
      quantity: 1,
      image: "/mnt/data/image.png",
    },
    {
      id: 2,
      name: "Truyện tranh",
      price: 59600,
      quantity: 1,
      image: "/mnt/data/image.png",
    },
    {
      id: 3,
      name: "Truyện tranh",
      price: 59600,
      quantity: 1,
      image: "/mnt/data/image.png",
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const updateQuantity = (id, delta) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter((itemId) => itemId !== id)
        : [...selectedItems, id]
    );
  };

  const totalQuantity = selectedItems.reduce((sum, id) => {
    const item = items.find((item) => item.id === id);
    return sum + (item ? item.quantity : 0);
  }, 0);

  const totalPrice = selectedItems.reduce((sum, id) => {
    const item = items.find((item) => item.id === id);
    return sum + (item ? item.price * item.quantity : 0);
  }, 0);

  return (
    <div
      className="container mt-4 d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      <h2 className="mb-4">GIỎ HÀNG</h2>

      {/* Header */}
      {/* Header */}
      <div className="row fw-bold border-bottom pb-2 mb-3 g-0">
        <div className="col-5">Tất cả ({items.length} sản phẩm)</div>
        <div className="col-2 text-center">Đơn giá</div>
        <div className="col-2 text-center">Số lượng</div>
        <div className="col-2 text-end">Thành tiền</div>
        <div className="col-1 text-center">Xóa</div>
      </div>

      {/* Cart Items */}
      <div className="w-100">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="row align-items-center mb-3 text-center g-0"
          >
            {/* Cột Checkbox + Ảnh + Tên sản phẩm */}
            <div className="col-5 d-flex align-items-center text-start">
              <input
                type="checkbox"
                className="form-check-input me-3"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelectItem(item.id)}
              />
              <img
                src={avt}
                alt={item.name}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                className="me-3"
              />
              <div>
                <div className="fw-bold">{item.name}</div>
                <div className="text-muted">Số lượng: {item.quantity}</div>
              </div>
            </div>

            {/* Đơn giá */}
            <div className="col-2 text-center">
              {item.price.toLocaleString()}đ
            </div>

            {/* Số lượng */}
            <div className="col-2 d-flex justify-content-center align-items-center">
              <button
                className="btn btn-sm border"
                onClick={() => updateQuantity(item.id, -1)}
              >
                -
              </button>
              <span className="mx-2 border rounded px-3 py-1">
                {item.quantity}
              </span>
              <button
                className="btn btn-sm border"
                onClick={() => updateQuantity(item.id, 1)}
              >
                +
              </button>
            </div>

            {/* Thành tiền */}
            <div className="col-2 text-end">
              {(item.price * item.quantity).toLocaleString()}đ
            </div>

            {/* Xóa */}
            <div className="col-1 text-center">
              <button
                className="btn btn-sm text-danger"
                onClick={() => removeItem(item.id)}
              >
                <i className="bi bi-trash" />
              </button>
            </div>

            {/* Voucher */}
            <div className="col-12 d-flex align-items-center text-muted mt-2">
              <input type="checkbox" className="form-check-input me-2" />
              <span>Voucher giảm 20%</span>
              <button className="btn btn-link text-danger ms-2 p-0">
                Xem thêm voucher
              </button>
            </div>

            {index !== items.length - 1 && <hr className="mt-2" />}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="container mt-4 border-top pt-3 bg-white fixed-bottom p-3 w-100 g-0">
        <div className="row w-100 text-center justify-content-center">
          <div className="col-md-5 d-flex align-items-center justify-content-start">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
            <span>Chọn tất cả ({items.length})</span>
          </div>
          <div className="col-md-7 text-center">
            <div className="d-flex justify-content-center align-items-center">
              <span>Tổng thanh toán ({totalQuantity} sản phẩm):</span>
              <h4 className="mb-0 ms-3">{totalPrice.toLocaleString()}đ</h4>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Chợ làng voucher: Chọn hoặc nhập mã"
                style={{ maxWidth: "300px" }}
              />
              <Link to="/checkout" className="btn btn-danger px-4">
                Mua hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
