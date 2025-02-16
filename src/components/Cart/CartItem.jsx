import React from "react";
import avt from "../../assets/images/avt.jpg";

const CartItem = ({ item, selectedItems, updateQuantity, toggleSelectItem, removeItem }) => {
  return (
    <div className="row align-items-center mb-3 text-center g-0 p-3 rounded border">
      <div className="col-5 d-flex align-items-center text-start">
        <input type="checkbox" className="form-check-input me-3" checked={selectedItems.includes(item.id)} onChange={() => toggleSelectItem(item.id)} />
        <img src={avt} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover" }} className="me-2" />
        <div>
          <div className="fw-bold">{item.name}</div>
          <div className="text-muted">Số lượng: {item.quantity}</div>
        </div>
      </div>
      <div className="col-2 text-center">{item.price.toLocaleString()}đ</div>
      <div className="col-2 d-flex justify-content-center align-items-center">
        <button className="btn btn-sm" onClick={() => updateQuantity(item.id, -1)}>-</button>
        <span className="mx-2 border rounded px-3 py-1">{item.quantity}</span>
        <button className="btn btn-sm" onClick={() => updateQuantity(item.id, 1)}>+</button>
      </div>
      <div className="col-2 text-end">{(item.price * item.quantity).toLocaleString()}đ</div>
      <div className="col-1 text-center">
        <button className="btn btn-sm text-danger" onClick={() => removeItem(item.id)}>
          <i className="bi bi-trash" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
