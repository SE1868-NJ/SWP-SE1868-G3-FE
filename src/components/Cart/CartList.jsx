import React, { useState } from "react";
import CartItem from "./CartItem";
import Checkbox from "./Checkbox";
import { Modal, Button } from "react-bootstrap"; // Sử dụng Bootstrap Modal (cần cài đặt react-bootstrap)

const CartList = ({
  items,
  selectedItems,
  toggleSelectItem,
  updateQuantity,
  removeItem,
  toggleSelectStore,
  appliedDiscounts,
  setAppliedDiscounts
}) => {
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.storeName]) acc[item.storeName] = [];
    acc[item.storeName].push(item);
    return acc;
  }, {});

  const [voucherCodes, setVoucherCodes] = useState({});
  const [showVoucherModal, setShowVoucherModal] = useState(null); // Thay đổi từ dropdown thành modal

  // Xử lý áp mã giảm giá
  const handleApplyVoucher = (storeName) => {
    const code = voucherCodes[storeName] || "";
    if (code === "SHOP2024") {
      setAppliedDiscounts({ ...appliedDiscounts, [storeName]: 0.1 }); // Giảm 10%
    } else {
      setAppliedDiscounts({ ...appliedDiscounts, [storeName]: 0 }); // Không áp dụng nếu sai mã
    }
    setShowVoucherModal(null); // Ẩn modal sau khi áp dụng
  };

  return (
    <div className="w-100">
      {Object.keys(groupedItems).map((storeName) => {
        const storeItems = groupedItems[storeName];
        const allSelected = storeItems.every((item) => selectedItems.includes(item.id));

        return (
          <div key={storeName} className="mb-4 border rounded bg-white p-3 shadow-sm position-relative">
            {/* Hiển thị tên cửa hàng */}
            <div className="d-flex align-items-center justify-content-between mb-2 px-3 py-2 border-bottom">
              <div className="d-flex align-items-center">
                <Checkbox
                  checked={allSelected}
                  onChange={() => toggleSelectStore(storeName)}
                  className="me-2"
                />
                <span className="fw-bold text-danger fs-5">{storeName}</span>
                <i className="bi bi-chat-left-dots-fill ms-2 text-danger"></i>
              </div>
            </div>

            {/* Danh sách sản phẩm trong cửa hàng */}
            <div className="p-2">
              {storeItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  selectedItems={selectedItems}
                  toggleSelectItem={toggleSelectItem}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                  appliedDiscounts={appliedDiscounts}
                />
              ))}
            </div>

            {/* Thêm Voucher Shop - Nút để mở modal */}
            <div className="position-relative">
              <button
                className="btn btn-link text-primary mt-2 d-flex align-items-center"
                onClick={() => setShowVoucherModal(storeName)}
              >
                <i className="bi bi-ticket-perforated-fill text-danger me-2"></i> Thêm Shop Voucher
              </button>

              {/* Modal voucher */}
              <Modal
                show={showVoucherModal === storeName}
                onHide={() => setShowVoucherModal(null)}
                centered
                className="custom-voucher-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title className="fw-bold">{storeName} Voucher</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 text-center">
                  <div className="d-flex justify-content-center mb-3">
                    {/* Icon voucher (biểu tượng vé giảm giá) */}
                    <span className="text-muted" style={{ fontSize: "48px" }}>
                      <i className="bi bi-ticket-perforated"></i>
                    </span>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control text-center py-2"
                      placeholder="Mã Voucher"
                      value={voucherCodes[storeName] || ""}
                      onChange={(e) => setVoucherCodes({ ...voucherCodes, [storeName]: e.target.value })}
                      style={{ maxWidth: "300px", margin: "0 auto" }}
                    />
                  </div>
                  <Button
                    variant="danger"
                    className="w-100 py-2"
                    onClick={() => handleApplyVoucher(storeName)}
                  >
                    ÁP DỤNG
                  </Button>
                  <p className="text-muted mt-3">
                    Chưa có mã giảm giá nào của Shop<br />
                    Nhập mã giảm giá có sẵn vào thanh bên trên
                  </p>
                  {/* Nút "Mua Kèm" bên trái (tuỳ chọn, bạn có thể thêm logic cho nó) */}
                  <Button
                    variant="outline-danger"
                    className="mt-3"
                    style={{ position: "absolute", left: "20px", top: "20px" }}
                  >
                    Mua Kèm
                  </Button>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartList;