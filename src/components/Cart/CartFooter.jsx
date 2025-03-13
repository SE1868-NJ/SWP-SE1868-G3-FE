import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";
import { Modal } from "react-bootstrap";

const CartFooter = ({ selectAll, toggleSelectAll, totalQuantity, totalPrice, items, selectedItems, removeItems }) => {
  const isAnyItemSelected = selectedItems?.length > 0;
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleCheckout = () => {
    if (isAnyItemSelected) {
      const selectedProducts = items.filter(item => selectedItems.includes(item.id));
      navigate("/order/checkout", { state: { selectedProducts } });
    } else {
      alert("Vui lòng chọn sản phẩm trước khi thanh toán!");
    }
  };

  return (
    <div className="container mt-4 border-top pt-3 bg-white fixed-bottom p-3 w-100 g-0">
      <div className="row w-100 align-items-center">
        <div className="col-md-6 d-flex align-items-center justify-content-start">
          <Checkbox checked={selectAll} onChange={toggleSelectAll} className="me-1" />
          <span className="fw-bold me-1">Chọn tất cả ({items.length})</span>
          <button
            className="btn btn-link text-danger me-1 fw-bold"
            style={{ fontSize: "1rem", textDecoration: "none" }}
            onClick={() => isAnyItemSelected && setShowDeleteConfirm(true)}
          >
            Xóa
          </button>
        </div>

        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <div className="d-flex align-items-center">
            <span className="fw-bold">Tổng thanh toán ({totalQuantity} sản phẩm):</span>
            <h5 className="mb-0 ms-2 fw-bold" style={{ fontSize: "1rem" }}>{totalPrice.toLocaleString()}đ</h5>
            <button
              className="btn btn-danger ms-3 px-3 py-1 fw-bold"
              style={{ fontSize: "1rem" }}
              disabled={!isAnyItemSelected}
              onClick={handleCheckout}
            >
              Mua hàng
            </button>
          </div>
        </div>
      </div>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Body className="text-center p-4">
          <p>Bạn có muốn xóa {selectedItems.length} sản phẩm?</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
              Trở lại
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                removeItems(selectedItems);
                setShowDeleteConfirm(false);
              }}
            >
              Có
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartFooter;