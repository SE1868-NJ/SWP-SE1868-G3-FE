import React, { useState } from "react";
import CartHeader from "../components/Cart/CartHeader";
import CartList from "../components/Cart/CartList";
import CartFooter from "../components/Cart/CartFooter";

const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Truyện tranh", price: 59600, quantity: 1 },
    { id: 2, name: "Truyện tranh", price: 59600, quantity: 1 },
    { id: 3, name: "Truyện tranh", price: 59600, quantity: 1 },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const updateQuantity = (id, delta) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)));
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  const toggleSelectAll = () => {
    setSelectedItems(selectAll ? [] : items.map((item) => item.id));
    setSelectAll(!selectAll);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(selectedItems.includes(id) ? selectedItems.filter((itemId) => itemId !== id) : [...selectedItems, id]);
  };

  const totalQuantity = selectedItems.reduce((sum, id) => {
    const item = items.find((item) => item.id === id);
    return sum + (item ? item.quantity : 0);
  }, 0);

  const totalPrice = selectedItems.reduce((sum, id) => {
    const item = items.find((item) => item.id === id);
    return sum + (item ? item.price * item.quantity : 0);
  }, 0);

  return (
    <div className="container mt-4">
      <h2>GIỎ HÀNG</h2>
      <CartHeader totalItems={items.length} />
      <CartList items={items} selectedItems={selectedItems} updateQuantity={updateQuantity} toggleSelectItem={toggleSelectItem} removeItem={removeItem} />
      <CartFooter selectAll={selectAll} toggleSelectAll={toggleSelectAll} totalQuantity={totalQuantity} totalPrice={totalPrice} items={items} />
    </div>
  );
};

export default Cart;
