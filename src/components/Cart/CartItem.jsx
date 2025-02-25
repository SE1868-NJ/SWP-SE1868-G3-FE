// components/Cart/CartItem.jsx
import React from "react";
import Checkbox from "./Checkbox"; // Thêm import Checkbox để tái sử dụng style
import avt from "../../assets/images/avt.jpg";

const CartItem = ({ item, selectedItems, updateQuantity, toggleSelectItem, removeItem, appliedDiscounts = {} }) => {
  // Kiểm tra appliedDiscounts tồn tại trước khi truy cập
  const discountRate = appliedDiscounts[item.storeName] || 0;

  // Tính giá gốc (trước khi giảm)
  const originalPrice = item.price * item.quantity;

  // Tính giá sau khi giảm (nếu có voucher)
  const discountedPrice = originalPrice * (1 - discountRate);

  // Tạo component nhỏ để hiển thị giá, tránh lặp code
  const PriceDisplay = ({ originalPrice, discountedPrice, discountRate }) => (
    discountRate > 0 ? (
      <>
        <del className="text-muted">{originalPrice.toLocaleString()}đ</del>
        <br />
        <span className="text-danger fw-bold">{discountedPrice.toLocaleString()}đ</span>
      </>
    ) : (
      <span>{originalPrice.toLocaleString()}đ</span>
    )
  );

  return (
    <div className="row align-items-center mb-3 text-center g-0 p-3 rounded border">
      {/* Cột chọn sản phẩm */}
      <div className="col-5 d-flex align-items-center text-start">
        {/* Sử dụng Checkbox component thay cho input gốc */}
        <Checkbox
          checked={selectedItems.includes(item.id)}
          onChange={() => toggleSelectItem(item.id)}
          className="me-3"
        />
        <img src={avt} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover" }} className="me-2" />
        <div>
          <div className="fw-bold">{item.name}</div>
          {/* <div className="text-muted">Số lượng: {item.quantity}</div> */} {/* Comment cũ được giữ nguyên */}
        </div>
      </div>

      {/* Cột hiển thị giá gốc - Sử dụng PriceDisplay */}
      <div className="col-2 text-center">
        <PriceDisplay originalPrice={originalPrice} discountedPrice={discountedPrice} discountRate={discountRate} />
      </div>

      {/* Cột tăng/giảm số lượng */}
      <div className="col-2 d-flex justify-content-center align-items-center">
        <button className="btn btn-sm" onClick={() => updateQuantity(item.id, -1)}>-</button>
        <span className="mx-2 border rounded px-3 py-1">{item.quantity}</span>
        <button className="btn btn-sm" onClick={() => updateQuantity(item.id, 1)}>+</button>
      </div>

      {/* Cột tổng giá trị sản phẩm (sau khi giảm giá nếu có) - Sử dụng PriceDisplay */}
      <div className="col-2 text-center">
        <PriceDisplay originalPrice={originalPrice} discountedPrice={discountedPrice} discountRate={discountRate} />
      </div>

      {/* Cột nút xóa sản phẩm */}
      <div className="col-1 text-center">
        <button className="btn btn-sm text-danger" onClick={() => removeItem(item.id)}>
          <i className="bi bi-trash" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;