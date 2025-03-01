import React, { useState } from "react";
import Checkbox from "./Checkbox";
import avt from "../../assets/images/avt.jpg";
import { Modal } from "react-bootstrap";

const CartItem = ({ item, selectedItems, updateQuantity, toggleSelectItem, removeItem, appliedDiscounts = {} }) => {
  const { id, name, price, quantity, storeName, stock = 1000 } = item;
  const isSelected = selectedItems.includes(id);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Tính tổng mức giảm giá từ appliedDiscounts
  const discounts = appliedDiscounts[storeName] || [];
  const totalDiscount = isSelected && discounts.length > 0
    ? discounts.reduce((sum, discount) => sum + (Number(discount.rate) || 0), 0)
    : 0;

  const originalPricePerUnit = Number(price);
  const originalPrice = originalPricePerUnit * quantity;

  const discountedPricePerUnit = originalPricePerUnit * (1 - totalDiscount);
  const discountedPrice = originalPrice * (1 - totalDiscount);

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

  const handleUpdateQuantity = (delta) => {
    const newQuantity = Math.max(1, quantity + delta);
    if (newQuantity > stock) {
      alert(`Số lượng vượt quá kho (${stock} sản phẩm). Vui lòng chọn số lượng nhỏ hơn hoặc bằng ${stock}.`);
      return;
    }
    updateQuantity(id, delta);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    removeItem(id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="row align-items-center mb-3 text-center g-0 p-3 rounded border">
      <div className="col-5 d-flex align-items-center text-start">
        <Checkbox
          checked={isSelected}
          onChange={() => toggleSelectItem(id)}
          className="me-3"
        />
        <img src={avt} alt={name} style={{ width: "80px", height: "80px", objectFit: "cover" }} className="me-2" />
        <div>
          <div className="fw-bold">{name}</div>
          <div className="text-muted">Kho: {stock}</div>
          {isSelected && discounts.length > 0 && (
            <p className="text-success mb-0">
              Giảm giá: {(totalDiscount * 100).toFixed(0)}% (Mã: {discounts.map(d => d.code).join(', ')})
            </p>
          )}
        </div>
      </div>

      <div className="col-2 text-center">
        <PriceDisplay originalPrice={originalPricePerUnit} discountedPrice={discountedPricePerUnit} discountRate={totalDiscount} />
      </div>

      <div className="col-2 d-flex justify-content-center align-items-center">
        <button className="btn btn-sm" onClick={() => handleUpdateQuantity(-1)}>-</button>
        <span className="mx-2 border rounded px-3 py-1">{quantity}</span>
        <button className="btn btn-sm" onClick={() => handleUpdateQuantity(1)}>+</button>
      </div>

      <div className="col-2 text-center">
        <PriceDisplay originalPrice={originalPrice} discountedPrice={discountedPrice} discountRate={totalDiscount} />
      </div>

      <div className="col-1 text-center">
        <button className="btn btn-sm text-danger" onClick={handleDeleteClick}>
          <i className="bi bi-trash" />
        </button>
      </div>

      <Modal show={showDeleteConfirm} onHide={handleCancelDelete} centered>
        <Modal.Body className="text-center p-4">
          <p>Bạn có muốn xóa sản phẩm này?</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-secondary" onClick={handleCancelDelete}>
              Trở lại
            </button>
            <button className="btn btn-danger" onClick={handleConfirmDelete}>
              Có
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartItem;