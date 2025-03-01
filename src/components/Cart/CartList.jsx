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
  removeItems,
  applyVoucher, // Nhận applyVoucher từ props
  removeVoucher, // Nhận removeVoucher từ props
}) => {
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.storeName]) acc[item.storeName] = [];
    acc[item.storeName].push(item);
    return acc;
  }, {});

  const [voucherCodes, setVoucherCodes] = useState({}); // Lưu nhiều mã voucher cho mỗi storeName
  const [showVoucherModal, setShowVoucherModal] = useState(null); // Store name của modal đang hiển thị
  const voucherButtonRefs = useRef({}); // Dùng để lưu trữ ref của từng nút "Thêm Shop Voucher"

  // Xử lý áp mã giảm giá
  const handleApplyVoucher = async (storeName) => {
    const code = voucherCodes[storeName] || "";
    if (!code) {
      alert('Vui lòng nhập mã voucher.');
      return;
    }

    try {
      await applyVoucher(storeName, code);
      setVoucherCodes(prev => ({ ...prev, [storeName]: '' }));
      setShowVoucherModal(null);
    } catch (error) {
      console.error('Lỗi khi áp dụng voucher:', error);
      alert(error.message || 'Mã voucher không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handleRemoveVoucher = async (storeName, codeToRemove) => {
    const storeItems = items.filter(item => item.storeName === storeName);
    if (storeItems.length > 0) {
      const cartId = storeItems[0].id;
      console.log('Gọi xóa voucher:', { cartId, storeName, codeToRemove });
      try {
        await removeVoucher(cartId, storeName, codeToRemove);
        setShowVoucherModal(null);
      } catch (error) {
        console.error('Lỗi khi xóa:', error);
        // Đã xử lý lỗi trong CartContainer.js, không cần hiển thị lại
      }
    } else {
      alert('Không tìm thấy sản phẩm trong cửa hàng này.');
    }
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
      const totalDiscount = selectedItems.includes(item.id) && discounts.length > 0
        ? discounts.reduce((sum, discount) => sum + (Number(discount.rate) || 0), 0)
        : 0;
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
        const allSelected = storeItems.every(item => selectedItems.includes(item.id));
        const currentDiscounts = appliedDiscounts[storeName] || [];

        return (
          <div key={storeName} className="mb-4 border rounded bg-white p-3 shadow-sm position-relative">
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

            <div className="p-2">
              {storeItems.map(item => (
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

            <div className="position-relative">
              <button
                className="btn btn-link text-primary mt-2 d-flex align-items-center"
                ref={el => (voucherButtonRefs.current[storeName] = el)}
                onClick={() => toggleVoucherModal(storeName)}
                style={{ textDecoration: "none" }}
              >
                <i className="bi bi-ticket-perforated-fill text-danger me-2"></i> Thêm Shop Voucher
              </button>

              <VoucherModal
                show={showVoucherModal === storeName}
                onClose={() => setShowVoucherModal(null)}
                storeName={storeName}
                voucherCode={voucherCodes[storeName] || ""}
                appliedVouchers={currentDiscounts}
                onChangeVoucher={(e) => setVoucherCodes({ ...voucherCodes, [storeName]: e.target.value })}
                onApplyVoucher={() => handleApplyVoucher(storeName)}
                onRemoveVoucher={(code) => handleRemoveVoucher(storeName, code)}
              />
            </div>
          </div>
        );
      })}
      <CartFooter
        selectAll={items.length > 0 && items.every(item => selectedItems.includes(item.id))}
        toggleSelectAll={() => {
          if (items.length > 0 && items.every(item => selectedItems.includes(item.id))) {
            toggleSelectStore(items[0].storeName);
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