import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import { Modal } from "react-bootstrap";

const CartItem = ({ item, selectedItems, updateQuantity, toggleSelectItem, removeItem }) => {
  const isSelected = selectedItems.includes(item.id);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showQuantityConfirm, setShowQuantityConfirm] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity.toString());
  const [localStock, setLocalStock] = useState(item.stock - item.quantity);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLocalQuantity(item.quantity.toString());
    setLocalStock(item.stock - item.quantity);
  }, [item]);

  const originalPrice = Number(item.price) * item.quantity;

  const validateQuantity = (newQuantity) => {
    const difference = newQuantity - item.quantity;
    if (difference > 0 && difference > localStock) {
      setErrorMessage(`Số lượng vượt quá kho (${localStock} sản phẩm còn lại).`);
      setShowQuantityConfirm(true);
      return false;
    }
    return true;
  };

  const handleUpdateQuantity = (delta) => {
    const newQuantity = Math.max(1, Number(localQuantity) + delta);
    if (!validateQuantity(newQuantity)) {
      return;
    }
    let newStock = localStock + delta;
    newStock = Math.max(0, newStock);
    setLocalStock(newStock);
    setLocalQuantity(newQuantity.toString());
    updateQuantity(item.id, newQuantity, newStock);
  };

  const handleQuantityChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setLocalQuantity(numericValue);
  };

  const handleQuantityBlur = () => {
    const newQuantity = parseInt(localQuantity, 10) || 1;
    setLocalQuantity(newQuantity.toString());
    if (!validateQuantity(newQuantity)) {
      setLocalQuantity(item.quantity.toString());
      return;
    }
    if (newQuantity !== item.quantity) {
      const difference = newQuantity - item.quantity;
      let newStock = localStock - difference;
      newStock = Math.max(0, newStock);

      if (newStock >= 0 && newStock <= item.stock)
        setLocalStock(newStock);
      updateQuantity(item.id, newQuantity, newStock);
    }
  };

  return (
    <div className="row align-items-center mb-3 text-center g-0 p-3 rounded border">
      <div className="col-5 d-flex align-items-center text-start">
        <Checkbox
          checked={isSelected}
          onChange={() => toggleSelectItem(item.id)}
          className="me-3"
        />
        <Link to={`/product/${item.productId}`}>
          <img src={item.image} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover" }} className="me-2" />
        </Link>
        <div>
          <div className="fw-bold">
            <Link to={`/product/${item.productId}`} className="text-dark text-decoration-none">
              {item.name}
            </Link>
          </div>
          <div className="text-muted">Kho: {localStock}</div>
        </div>
      </div>

      <div className="col-2 text-center">
        <span>{Number(item.price).toLocaleString()}đ</span>
      </div>

      <div className="col-2 d-flex justify-content-center align-items-center">
        <button className="btn btn-sm" onClick={() => handleUpdateQuantity(-1)}>-</button>
        <input
          type="text"
          className="mx-2 border rounded text-center"
          style={{ width: "50px", height: "30px" }}
          value={localQuantity}
          onChange={handleQuantityChange}
          onBlur={handleQuantityBlur}
        />
        <button className="btn btn-sm" onClick={() => handleUpdateQuantity(1)}>+</button>
      </div>

      <div className="col-2 text-center">
        <span>{originalPrice.toLocaleString()}đ</span>
      </div>

      <div className="col-1 text-center">
        <button className="btn btn-sm text-danger" onClick={() => setShowDeleteConfirm(true)}>
          <i className="bi bi-trash" />
        </button>
      </div>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Body className="text-center p-4">
          <p>Bạn có muốn xóa sản phẩm này?</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
              Trở lại
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                removeItem(item.id);
                setShowDeleteConfirm(false);
              }}
            >
              Có
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showQuantityConfirm} onHide={() => setShowQuantityConfirm(false)} centered>
        <Modal.Body className="text-center p-4">
          <p>{errorMessage}</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-secondary" onClick={() => setShowQuantityConfirm(false)}>
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartItem;