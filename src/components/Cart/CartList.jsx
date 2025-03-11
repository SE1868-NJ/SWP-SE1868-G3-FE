import React from "react";
import { Link } from "react-router-dom";
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
        const shopId = storeItems[0]?.shopId;

        return (
          <div key={storeName} className="mb-4 border rounded bg-white p-3 shadow-sm position-relative">
            <div className="d-flex align-items-center justify-content-between mb-2 px-3 py-2 border-bottom">
              <div className="d-flex align-items-center">
                <Checkbox
                  checked={allSelected}
                  onChange={() => toggleSelectStore(storeName)}
                  className="me-2"
                />
                <Link
                  to={`/shop/${shopId}/homepage`}
                  className="fw-bold text-danger fs-5 text-decoration-none"
                >
                  {storeName}
                </Link>
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
    </div>
  );
};

export default CartList;