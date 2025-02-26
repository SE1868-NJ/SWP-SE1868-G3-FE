import React, { useState, useRef } from "react";
import CartItem from "./CartItem";
import Checkbox from "./Checkbox";
import VoucherModal from "../Modals/VoucherModal";
import CartFooter from "./CartFooter";

const CartList = ({
  items,
  selectedItems,
  toggleSelectItem,
  updateQuantity,
  removeItem,
  toggleSelectStore,
  appliedDiscounts,
  setAppliedDiscounts,
  removeItems, // Nhận removeItems từ props
}) => {
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.storeName]) acc[item.storeName] = [];
    acc[item.storeName].push(item);
    return acc;
  }, {});

  const [voucherCodes, setVoucherCodes] = useState({}); // Lưu nhiều mã voucher cho mỗi storeName
  const [showVoucherModal, setShowVoucherModal] = useState(null); // Store name của modal đang hiển thị
  const voucherButtonRefs = useRef({}); // Dùng để lưu trữ ref của từng nút "Thêm Shop Voucher"

  // Xử lý áp mã giảm giá, cho phép tích lũy nhiều mã
  const handleApplyVoucher = (storeName) => {
    const code = voucherCodes[storeName] || "";
    const currentDiscounts = appliedDiscounts[storeName] || []; // Mảng các mã đã áp dụng và mức giảm giá

    if (code === "SHOP2024" || code === "DISCOUNT2025") {
      // Kiểm tra xem mã đã được áp dụng chưa
      if (!currentDiscounts.some(discount => discount.code === code)) {
        let discountRate;
        if (code === "SHOP2024") {
          discountRate = 0.1; // Giảm 10%
        } else if (code === "DISCOUNT2025") {
          discountRate = 0.15; // Giảm 15%
        }

        // Thêm mã mới vào danh sách áp dụng, nhưng giới hạn tổng giảm giá tối đa là 100%
        const totalDiscount = currentDiscounts.reduce((sum, d) => sum + d.rate, 0) + discountRate;
        if (totalDiscount <= 1) { // Đảm bảo tổng giảm giá không vượt quá 100%
          setAppliedDiscounts({
            ...appliedDiscounts,
            [storeName]: [...(currentDiscounts || []), { code, rate: discountRate }]
          });
        } else {
          alert("Tổng mức giảm giá không thể vượt quá 100%!");
        }
      } else {
        alert("Mã này đã được áp dụng!");
      }
    } else {
      alert("Mã voucher không hợp lệ!");
      setVoucherCodes({ ...voucherCodes, [storeName]: "" }); // Xóa mã không hợp lệ
    }
    setShowVoucherModal(null); // Ẩn modal sau khi áp dụng
  };

  // Xử lý xóa một mã voucher cụ thể
  const handleRemoveVoucher = (storeName, codeToRemove) => {
    const currentDiscounts = appliedDiscounts[storeName] || [];
    const updatedDiscounts = currentDiscounts.filter(discount => discount.code !== codeToRemove);
    setAppliedDiscounts({
      ...appliedDiscounts,
      [storeName]: updatedDiscounts.length > 0 ? updatedDiscounts : null
    });
  };

  const toggleVoucherModal = (storeName) => {
    setShowVoucherModal((prev) => (prev === storeName ? null : storeName));
  };

  // Tính tổng số lượng và tổng giá (sau khi giảm) để truyền xuống CartFooter
  const calculateTotal = () => {
    let totalQty = 0;
    let totalPrice = 0;

    items.forEach(item => {
      const discounts = appliedDiscounts[item.storeName] || [];
      const totalDiscount = selectedItems.includes(item.id) ? discounts.reduce((sum, discount) => sum + discount.rate, 0) : 0;
      const discountedPricePerUnit = item.price * (1 - totalDiscount);
      const itemTotal = discountedPricePerUnit * item.quantity;

      if (selectedItems.includes(item.id)) {
        totalQty += item.quantity;
        totalPrice += itemTotal;
      }
    });

    return { totalQuantity: totalQty, totalPrice: totalPrice };
  };

  const { totalQuantity, totalPrice } = calculateTotal();

  return (
    <div className="w-100">
      {Object.keys(groupedItems).map((storeName) => {
        const storeItems = groupedItems[storeName];
        const allSelected = storeItems.every((item) => selectedItems.includes(item.id));
        const currentDiscounts = appliedDiscounts[storeName] || [];

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
                  appliedDiscounts={appliedDiscounts} // Truyền toàn bộ appliedDiscounts để CartItem xử lý
                />
              ))}
            </div>

            {/* Thêm Voucher Shop - Nút để mở/đóng modal */}
            <div className="position-relative">
              <button
                className="btn btn-link text-primary mt-2 d-flex align-items-center"
                ref={(el) => (voucherButtonRefs.current[storeName] = el)} // Gán ref cho nút
                onClick={() => toggleVoucherModal(storeName)}
                style={{ textDecoration: "none" }}
              >
                <i className="bi bi-ticket-perforated-fill text-danger me-2"></i> Thêm Shop Voucher
              </button>

              {/* Hiển thị VoucherModal ngay dưới nút */}
              <VoucherModal
                show={showVoucherModal === storeName}
                onClose={() => setShowVoucherModal(null)}
                storeName={storeName}
                voucherCode={voucherCodes[storeName] || ""}
                appliedVouchers={currentDiscounts} // Truyền danh sách các mã đã áp dụng
                onChangeVoucher={(e) => setVoucherCodes({ ...voucherCodes, [storeName]: e.target.value })}
                onApplyVoucher={() => handleApplyVoucher(storeName)}
                onRemoveVoucher={(code) => handleRemoveVoucher(storeName, code)} // Thêm hàm xóa voucher
              />
            </div>
          </div>
        );
      })}
      {/* Thêm CartFooter ở cuối danh sách */}
      <CartFooter
        selectAll={items.length > 0 && items.every(item => selectedItems.includes(item.id))}
        toggleSelectAll={() => {
          if (items.length > 0 && items.every(item => selectedItems.includes(item.id))) {
            toggleSelectStore(items[0].storeName); // Giả sử toggleSelectStore sẽ hủy chọn tất cả
          } else {
            items.forEach(item => toggleSelectItem(item.id));
          }
        }}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        items={items}
        selectedItems={selectedItems}
        removeItems={removeItems}
      />
    </div>
  );
};

export default CartList;