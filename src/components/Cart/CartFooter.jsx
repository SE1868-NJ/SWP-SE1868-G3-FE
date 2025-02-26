import React, { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import { Modal } from "react-bootstrap"; // Sử dụng Modal từ react-bootstrap

const CartFooter = ({ selectAll, toggleSelectAll, totalQuantity, totalPrice, items, selectedItems, removeItems }) => {
  // Kiểm tra xem có ít nhất một sản phẩm được chọn không
  const isAnyItemSelected = selectedItems && selectedItems.length > 0;

  // State để quản lý hiển thị modal xác nhận
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Hàm xử lý khi nhấn nút "Xóa"
  const handleDeleteClick = () => {
    if (isAnyItemSelected) {
      setShowDeleteConfirm(true);
    }
  };

  // Hàm xác nhận xóa các sản phẩm được chọn
  const handleConfirmDelete = () => {
    if (removeItems) {
      removeItems(selectedItems); // Gọi hàm removeItems để xóa các sản phẩm được chọn
    }
    setShowDeleteConfirm(false);
  };

  // Hàm hủy xóa
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="container mt-4 border-top pt-3 bg-white fixed-bottom p-3 w-100 g-0">
      <div className="row w-100 align-items-center">
        {/* Checkbox, Xóa */}
        <div className="col-md-6 d-flex align-items-center justify-content-start">
          <Checkbox checked={selectAll} onChange={toggleSelectAll} className="me-1" />
          <span className="fw-bold me-1">Chọn tất cả ({items.length})</span>
          <button
            className="btn btn-link text-danger me-1 fw-bold"
            style={{ fontSize: "1rem", textDecoration: "none" }}
            onClick={handleDeleteClick}
          >
            Xóa
          </button>
        </div>

        {/* Tổng thanh toán Mua hàng */}
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <div className="d-flex align-items-center">
            <span className="fw-bold">Tổng thanh toán ({totalQuantity} sản phẩm):</span>
            <h5 className="mb-0 ms-2 fw-bold" style={{ fontSize: "1rem" }}>{totalPrice.toLocaleString()}đ</h5>
            <Link
              to={isAnyItemSelected ? "/order/checkout" : "#"} // Chuyển đến trang checkout nếu có sản phẩm được chọn, ngược lại giữ tại chỗ
              className={`btn btn-danger ms-3 px-3 py-1 fw-bold`}
              style={{ fontSize: "1rem" }}
              disabled={!isAnyItemSelected} // Vô hiệu hóa nút nếu không có sản phẩm được chọn
            >
              Mua hàng
            </Link>
          </div>
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteConfirm} onHide={handleCancelDelete} centered>
        <Modal.Body className="text-center p-4">
          <p>Bạn có muốn xóa {selectedItems.length} sản phẩm?</p>
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

export default CartFooter;