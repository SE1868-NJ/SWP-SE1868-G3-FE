import React from "react";
import CartItem from "./CartItem";

const CartList = ({ items, selectedItems, toggleSelectItem, updateQuantity, removeItem, toggleSelectStore }) => {
  // Nhóm sản phẩm theo cửa hàng
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.storeName]) acc[item.storeName] = [];
    acc[item.storeName].push(item);
    return acc;
  }, {});

  return (
    <div className="w-100">
      {Object.keys(groupedItems).map((storeName) => {
        const storeItems = groupedItems[storeName];
        const allSelected = storeItems.every((item) => selectedItems.includes(item.id));

        return (
          <div key={storeName} className="mb-4">
            {/* Hiển thị tên cửa hàng + checkbox chọn cả cửa hàng */}
            <div className="d-flex align-items-center mb-2">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={allSelected}
                onChange={() => toggleSelectStore(storeName)}
              />
              <span className="fw-bold">{storeName}</span>
            </div>

            {/* Danh sách sản phẩm trong cửa hàng */}
            {storeItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default CartList;
