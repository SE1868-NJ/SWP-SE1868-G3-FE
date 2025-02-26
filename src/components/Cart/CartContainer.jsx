import React, { useState, useEffect, useMemo } from "react"; // Thêm useMemo để tối ưu hiệu suất
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import CartFooter from "./CartFooter";

const CartContainer = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Truyện tranh", price: 59600, quantity: 1, image: "/mnt/data/image.png", storeName: "PIARA Official Store", stock: 10 },
    { id: 2, name: "Truyện tranh", price: 59600, quantity: 1, image: "/mnt/data/image.png", storeName: "PIARA Store", stock: 10 },
    { id: 3, name: "Truyện tranh", price: 59600, quantity: 1, image: "/mnt/data/image.png", storeName: "PIARA Store", stock: 10 },
  ]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // Đảm bảo selectedItems là mảng các số
  const [appliedDiscounts, setAppliedDiscounts] = useState({});

  // Hàm cập nhật số lượng sản phẩm, validate với kho
  const updateQuantity = (id, delta) => {
    setItems(items.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        if (newQuantity > item.stock) {
          alert(`Số lượng vượt quá kho (${item.stock} sản phẩm). Vui lòng chọn số lượng nhỏ hơn hoặc bằng ${item.stock}.`);
          return item; // Không cập nhật nếu vượt quá kho
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Hàm xóa một sản phẩm
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  // Hàm xóa nhiều sản phẩm dựa trên danh sách selectedItems
  const removeItems = (itemIds) => {
    setItems(items.filter((item) => !itemIds.includes(item.id)));
    setSelectedItems(selectedItems.filter((id) => !itemIds.includes(id)));
  };

  // Hàm chọn/bỏ chọn từng sản phẩm - Đảm bảo sử dụng số cho id
  const toggleSelectItem = (id) => {
    const numId = Number(id); // Chuyển id thành số để đảm bảo khớp với items
    const newSelectedItems = selectedItems.includes(numId)
      ? selectedItems.filter((itemId) => itemId !== numId)
      : [...selectedItems, numId];
    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === items.length && items.length > 0);
  };

  // Hàm chọn/bỏ chọn tất cả sản phẩm
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id)); // Đảm bảo trả về số
    }
    setSelectAll(!selectAll);
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
  }, [selectedItems, items]);

  // Tính tổng giá trị đơn hàng sau giảm giá - Chỉ áp dụng giảm giá cho sản phẩm được chọn
  const totalPriceWithDiscount = useMemo(() => {
    return selectedItems.reduce((sum, id) => {
      const item = items.find((i) => i.id === id);
      if (!item) return sum;
      const discounts = appliedDiscounts[item.storeName] || [];
      const totalDiscount = discounts.reduce((sum, discount) => sum + (discount.rate || 0), 0);
      return sum + item.price * item.quantity * (1 - totalDiscount);
    }, 0);
  }, [selectedItems, items, appliedDiscounts]);

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
          removeItems={removeItems} // Truyền removeItems xuống CartList
        />
      </div>
      <CartFooter
        selectAll={selectAll}
        toggleSelectAll={toggleSelectAll}
        totalQuantity={totalQuantity}
        totalPrice={totalPriceWithDiscount}
        items={items}
        selectedItems={selectedItems}
        removeItems={removeItems} // Truyền hàm removeItems xuống CartFooter
      />
    </div>
  );
};

export default CartContainer;