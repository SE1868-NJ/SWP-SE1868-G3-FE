import React, { useState, useRef } from "react";
import CartItem from "./CartItem";
import Checkbox from "./Checkbox";
import CartFooter from "./CartFooter";

const CartList = ({
  items,
  selectedItems,
  toggleSelectItem,
  updateQuantity,
  removeItem,
  toggleSelectStore,
  removeItems,
}) => {
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.storeName]) acc[item.storeName] = [];
    acc[item.storeName].push(item);
    return acc;
  }, {});

  const calculateTotal = () => {
    let totalQty = 0;
    let totalPrice = 0;

    items.forEach(item => {
      if (selectedItems.includes(item.id)) {
        totalQty += item.quantity;
        totalPrice += item.price * item.quantity;
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
                />
              ))}
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