import React, { useState, useEffect, useMemo, useCallback } from "react";
import cartService from "../../services/cartService";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import CartFooter from "./CartFooter";

const CartContainer = () => {
  const [items, setItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [appliedDiscounts, setAppliedDiscounts] = useState({});
  const [userId, setUserId] = useState(1); // Giả sử userId là 1, có thể lấy từ context/auth
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const cartData = await cartService.getCartsByUserId(userId);
        console.log('Dữ liệu giỏ hàng:', cartData);
        let formattedItems = [];
        if (Array.isArray(cartData)) {
          formattedItems = cartData.flatMap(shop =>
            shop.items.map(item => ({
              id: item.cart_id,
              name: item.product.product_name,
              price: Number(item.product.sale_price),
              quantity: item.quantity,
              image: item.product.image_url,
              storeName: shop.shop_info.shop_name,
              stock: item.product.stock_quantity,
              productId: item.product_id,
              shopId: shop.shop_info.shop_id // Thêm shopId tại đây
            }))
          );
        }
        setItems(formattedItems);
        setSelectedItems(formattedItems.map(item => item.id));
      } catch (error) {
        console.error('Lỗi khi fetch giỏ hàng:', error);
        setError(error.message || 'Không thể tải giỏ hàng. Vui lòng thử lại.');
        setItems([]);
        setSelectedItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [userId]);

  // Sử dụng useCallback để tránh re-render không cần thiết
  const updateQuantity = useCallback(async (id, delta) => {
    const item = items.find(item => item.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    if (newQuantity > item.stock) {
      alert(`Số lượng vượt quá kho (${item.stock} sản phẩm). Vui lòng chọn số lượng nhỏ hơn hoặc bằng ${item.stock}.`);
      return;
    }

    try {
      // Gọi API để cập nhật số lượng
      await cartService.updateCartQuantity(id, newQuantity);
      // Cập nhật state local
      setItems(items.map(i => i.id === id ? { ...i, quantity: newQuantity } : i));
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
      alert("Không thể cập nhật số lượng. Vui lòng thử lại.");
    }
  }, [items]); // Dependency array chỉ bao gồm items

  const removeItem = async (id) => {
    try {
      await cartService.removeCartItem(id);
      setItems(items.filter(item => item.id !== id));
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } catch (error) {
      alert("Không thể xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  const removeItems = async (itemIds) => {
    try {
      await cartService.removeMultipleCartItems(itemIds);
      setItems(items.filter(item => !itemIds.includes(item.id)));
      setSelectedItems(selectedItems.filter(id => !itemIds.includes(id)));
    } catch (error) {
      alert("Không thể xóa nhiều sản phẩm. Vui lòng thử lại.");
    }
  };

  const toggleSelectItem = (id) => {
    const numId = Number(id);
    const newSelectedItems = selectedItems.includes(numId)
      ? selectedItems.filter(itemId => itemId !== numId)
      : [...selectedItems, numId];
    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === items.length && items.length > 0);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectStore = (storeName) => {
    const storeItems = items.filter(item => item.storeName === storeName).map(item => item.id);
    const isSelected = storeItems.every(id => selectedItems.includes(id));
    let newSelectedItems = isSelected
      ? selectedItems.filter(id => !storeItems.includes(id))
      : [...new Set([...selectedItems, ...storeItems])];
    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === items.length && items.length > 0);
  };

  const totalQuantity = useMemo(() => {
    return selectedItems.reduce((sum, id) => {
      const item = items.find(item => item.id === id);
      return sum + (item ? item.quantity : 0);
    }, 0);
  }, [selectedItems, items]);

  const totalPriceWithDiscount = useMemo(() => {
    return selectedItems.reduce((sum, id) => {
      const item = items.find(i => i.id === id);
      if (!item) return sum;
      const discounts = appliedDiscounts[item.storeName] || [];
      const totalDiscount = discounts.reduce((acc, discount) => acc + (Number(discount.rate) || 0), 0); // Đảm bảo rate là số
      return sum + item.price * item.quantity * (1 - totalDiscount);
    }, 0);
  }, [selectedItems, items, appliedDiscounts]);

  useEffect(() => {
    setSelectAll(items.length > 0 && selectedItems.length === items.length);
  }, [items, selectedItems]);

  const applyVoucher = async (storeName, voucherCode) => {
    try {
      const storeItems = items.filter(item => item.storeName === storeName);
      if (!storeItems.length) {
        alert('Không có sản phẩm nào trong cửa hàng này.');
        return;
      }

      const storeId = storeItems[0].shopId;
      const response = await cartService.applyVoucher(userId, storeId, voucherCode);

      // Cập nhật danh sách voucher đã áp dụng từ phản hồi API
      const appliedVouchers = response.appliedVouchers || [];
      setAppliedDiscounts(prev => ({
        ...prev,
        [storeName]: appliedVouchers
      }));

      // Fetch lại giỏ hàng để đồng bộ
      const cartData = await cartService.getCartsByUserId(userId);
      const formattedItems = cartData.flatMap(shop =>
        shop.items.map(item => ({
          id: item.cart_id,
          name: item.product.product_name,
          price: Number(item.product.sale_price),
          quantity: item.quantity,
          image: item.product.image_url,
          storeName: shop.shop_info.shop_name,
          stock: item.product.stock_quantity,
          productId: item.product_id,
          shopId: shop.shop_info.shop_id
        }))
      );
      setItems(formattedItems);

      alert('Voucher đã được áp dụng thành công.');
    } catch (error) {
      console.error('Lỗi khi áp dụng voucher:', error);
      alert(error.message || 'Lỗi khi áp dụng voucher.');
    }
  };

  const removeVoucher = async (cartId, storeName, voucherCode) => {
    try {
      if (!cartId || !voucherCode) {
        throw new Error('Thiếu thông tin cartId hoặc voucherCode.');
      }

      console.log('Gửi yêu cầu xóa voucher:', { cartId, storeName, voucherCode });

      // Gọi API xóa voucher
      const response = await cartService.removeVoucher(cartId, voucherCode);
      console.log('Kết quả xóa voucher:', response);

      // Cập nhật trạng thái voucher đã áp dụng
      setAppliedDiscounts(prev => {
        const updated = { ...prev };
        if (updated[storeName]) {
          updated[storeName] = updated[storeName].filter(v => v.code !== voucherCode);
          if (updated[storeName].length === 0) delete updated[storeName];
        }
        return updated;
      });

      // Fetch lại giỏ hàng để đồng bộ
      const cartData = await cartService.getCartsByUserId(userId);
      const formattedItems = cartData.flatMap(shop =>
        shop.items.map(item => ({
          id: item.cart_id,
          name: item.product.product_name,
          price: Number(item.product.sale_price),
          quantity: item.quantity,
          image: item.product.image_url,
          storeName: shop.shop_info.shop_name,
          stock: item.product.stock_quantity,
          productId: item.product_id,
          shopId: shop.shop_info.shop_id
        }))
      );
      setItems(formattedItems);

      alert('Voucher đã được xóa thành công.');
    } catch (error) {
      console.error('Lỗi khi xóa voucher:', error);
      // Không hiển thị lỗi nếu xóa thành công trong DB
      if (error.message === 'Không có voucher nào được áp dụng cho mục này.' && !appliedDiscounts[storeName]?.some(v => v.code === voucherCode)) {
        alert('Voucher đã được xóa thành công.');
        setAppliedDiscounts(prev => {
          const updated = { ...prev };
          if (updated[storeName]) {
            updated[storeName] = updated[storeName].filter(v => v.code !== voucherCode);
            if (updated[storeName].length === 0) delete updated[storeName];
          }
          return updated;
        });
        setShowVoucherModal(null);
      } else {
        alert(error.message || 'Không thể xóa voucher.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
          removeItems={removeItems}
          applyVoucher={applyVoucher}
          removeVoucher={removeVoucher} // Truyền hàm removeVoucher xuống
        />
      </div>
      <CartFooter
        selectAll={selectAll}
        toggleSelectAll={toggleSelectAll}
        totalQuantity={totalQuantity}
        totalPrice={totalPriceWithDiscount}
        items={items}
        selectedItems={selectedItems}
        removeItems={removeItems}
      />
    </div>
  );
};

export default CartContainer;