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
      storeName: "PIARA Official Store",
    },
    {
      id: 2,
      name: "Truyện tranh",
      price: 59600,
      quantity: 1,
      image: "/mnt/data/image.png",
      storeName: "Official Store",
    },
    {
      id: 3,
      name: "Truyện tranh",
      price: 59600,
      quantity: 1,
      image: "/mnt/data/image.png",
      storeName: "PIARA Store",
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

  const toggleSelectStore = (storeName) => {
    const storeItems = items
      .filter((item) => item.storeName === storeName)
      .map((item) => item.id);
    const isSelected = storeItems.every((id) => selectedItems.includes(id));

    if (isSelected) {
      setSelectedItems(selectedItems.filter((id) => !storeItems.includes(id)));
    } else {
      setSelectedItems([...new Set([...selectedItems, ...storeItems])]);
    }
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
      <div className="row fw-bold border-bottom pb-2 mb-3 g-0">
        <div className="col-5">Tất cả ({items.length} sản phẩm)</div>
        <div className="col-2 text-center">Đơn giá</div>
        <div className="col-2 text-center">Số lượng</div>
        <div className="col-2 text-end">Thành tiền</div>
        <div className="col-1 text-center">Xóa</div>
      </div>

      {/* Cart Items */}
      <div className="w-100">
        {items.map((item) => (
          <div key={item.id} className="mb-3">
            <input
              type="checkbox"
              id={`store-${item.storeName}`}
              className="me-2"
              checked={items
                .filter((i) => i.storeName === item.storeName)
                .every((storeItem) => selectedItems.includes(storeItem.id))}
              onChange={() => toggleSelectStore(item.storeName)}
            />
            <label
              htmlFor={`store-${item.storeName}`}
              className="text-dark text-start"
            >
              {item.storeName}
              <i className="bi bi-chat-left-dots-fill ms-2 text-danger" />
            </label>

            <div
              className="row align-items-center mb-3 text-center g-0 p-3 rounded border"
              style={{
                backgroundColor: "white", // Màu nền xám nhạt
                border: "1px solid #dee2e6", // Viền mỏng màu xám
                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)", // Đổ bóng trái, phải, dưới
              }}
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
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  className="me-2"
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
                  className="btn btn-sm "
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <span className="mx-2 border rounded px-3 py-1">
                  {item.quantity}
                </span>
                <button
                  className="btn btn-sm "
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
                <button className="btn me-2 mt-3 p-0">Voucher giảm 20%</button>
                <button className="btn text-danger ms-2 mt-3 p-0">
                  Xem thêm voucher
                </button>
              </div>
            </div>
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
