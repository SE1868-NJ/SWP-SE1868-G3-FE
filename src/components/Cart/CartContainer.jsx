// components/Cart/CartContainer.jsx
import React, { useState, useEffect, useMemo } from "react"; // Thêm useMemo để tối ưu hiệu suất
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import CartFooter from "./CartFooter";

const CartContainer = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Truyện tranh", price: 59600, quantity: 1, image: "/mnt/data/image.png", storeName: "PIARA Official Store" },
    { id: 2, name: "Truyện tranh", price: 59600, quantity: 1, image: "/mnt/data/image.png", storeName: "PIARA Store" },
    { id: 3, name: "Truyện tranh", price: 59600, quantity: 1, image: "/mnt/data/image.png", storeName: "PIARA Store" },
  ]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [appliedDiscounts, setAppliedDiscounts] = useState({});

  // Hàm cập nhật số lượng sản phẩm
  const updateQuantity = (id, delta) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  // Hàm chọn/bỏ chọn tất cả sản phẩm
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Hàm chọn/bỏ chọn từng sản phẩm
  const toggleSelectItem = (id) => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];
    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === items.length && items.length > 0);
  };

  // Hàm chọn/bỏ chọn tất cả sản phẩm trong một cửa hàng
  const toggleSelectStore = (storeName) => {
    const storeItems = items.filter((item) => item.storeName === storeName).map((item) => item.id);
    const isSelected = storeItems.every((id) => selectedItems.includes(id));
    let newSelectedItems = isSelected
      ? selectedItems.filter((id) => !storeItems.includes(id))
      : [...new Set([...selectedItems, ...storeItems])];
    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === items.length && items.length > 0);
  };

  // Tính tổng số lượng sản phẩm đã chọn - Sử dụng useMemo để tối ưu
  const totalQuantity = useMemo(() => {
    return selectedItems.reduce((sum, id) => {
      const item = items.find((item) => item.id === id);
      return sum + (item ? item.quantity : 0);
    }, 0);
  }, [selectedItems, items]); // Dependency: chỉ tính lại khi selectedItems hoặc items thay đổi

  // Tính tổng giá trị đơn hàng sau giảm giá - Sử dụng useMemo để tối ưu
  const totalPriceWithDiscount = useMemo(() => {
    return selectedItems.reduce((sum, id) => {
      const item = items.find((i) => i.id === id);
      if (!item) return sum;
      const discountRate = appliedDiscounts[item.storeName] || 0;
      return sum + item.price * item.quantity * (1 - discountRate);
    }, 0);
  }, [selectedItems, items, appliedDiscounts]); // Dependency: chỉ tính lại khi selectedItems, items, hoặc appliedDiscounts thay đổi

  // Đồng bộ trạng thái selectAll khi items hoặc selectedItems thay đổi
  useEffect(() => {
    setSelectAll(items.length > 0 && selectedItems.length === items.length);
  }, [items, selectedItems]);

  return (
    <div className="container mt-4 d-flex flex-column" style={{ minHeight: "100vh" }}>
      <CartHeader totalItems={items.length} selectAll={selectAll} toggleSelectAll={toggleSelectAll} />
      <div style={{ paddingBottom: "100px" }}>
        <CartList
          items={items}
          selectedItems={selectedItems}
          toggleSelectItem={toggleSelectItem}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          toggleSelectStore={toggleSelectStore}
          appliedDiscounts={appliedDiscounts}
          setAppliedDiscounts={setAppliedDiscounts}
        />
      </div>
      <CartFooter
        selectAll={selectAll}
        toggleSelectAll={toggleSelectAll}
        totalQuantity={totalQuantity}
        totalPrice={totalPriceWithDiscount}
        items={items}
      />
    </div>
  );
};

export default CartContainer;