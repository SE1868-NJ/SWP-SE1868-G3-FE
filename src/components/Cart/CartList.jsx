import React from "react";
import CartItem from "./CartItem";

const CartList = ({ items, selectedItems, updateQuantity, toggleSelectItem, removeItem }) => {
  return (
    <div className="w-100">
      {items.map((item) => (
        <CartItem 
          key={item.id}
          item={item}
          selectedItems={selectedItems}
          updateQuantity={updateQuantity}
          toggleSelectItem={toggleSelectItem}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default CartList;
