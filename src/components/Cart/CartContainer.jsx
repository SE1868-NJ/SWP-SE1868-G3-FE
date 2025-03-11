import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import cartService from "../../services/cartService";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import CartFooter from "./CartFooter";
import { useAuth } from "../../hooks/contexts/AuthContext";

const CartContainer = () => {
  const [items, setItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const cartData = await cartService.getCartsByUserId(user.id);
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
              shopId: shop.shop_info.shop_id
            }))
          );
        }
        setItems(formattedItems);
        setSelectedItems(formattedItems.map(item => item.id));
      } catch (error) {
        setError(error.message || 'Không thể tải giỏ hàng. Vui lòng thử lại.');
        setItems([]);
        setSelectedItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCartData();
  }, [user.id]);

  const updateQuantity = useCallback(async (id, delta) => {
    const item = items.find(item => item.id === id);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + delta);
    if (newQuantity > item.stock) {
      alert(`Số lượng vượt quá kho (${item.stock} sản phẩm). Vui lòng chọn số lượng nhỏ hơn hoặc bằng ${item.stock}.`);
      return;
    }
    try {
      await cartService.updateCartQuantity(id, newQuantity);
      setItems(items.map(i => i.id === id ? { ...i, quantity: newQuantity } : i));
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
      alert("Không thể cập nhật số lượng. Vui lòng thử lại.");
    }
  }, [items]);

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

  const totalPrice = useMemo(() => {
    return selectedItems.reduce((sum, id) => {
      const item = items.find(i => i.id === id);
      return sum + (item ? item.price * item.quantity : 0);
    }, 0);
  }, [selectedItems, items]);

  useEffect(() => {
    setSelectAll(items.length > 0 && selectedItems.length === items.length);
  }, [items, selectedItems]);

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4 d-flex flex-column" style={{ minHeight: "100vh" }}>
      {items.length === 0 ? (
        <div className="text-center mt-5 d-flex flex-column align-items-center justify-content-center">
          <img
            src="https://ecommerce-frontend-view.netlify.app/empty-cart.png"
            alt="Empty Cart"
            className="mb-4"
            style={{ maxWidth: '250px', height: 'auto' }}
          />
          <h2 className="mb-3">Giỏ hàng hiện tại đang trống</h2>
          <button
            className="btn btn-danger"
            onClick={handleContinueShopping}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            TIẾP TỤC MUA SẮM
          </button>
        </div>
      ) : (
        <>
          <CartHeader totalItems={items.length} selectAll={selectAll} toggleSelectAll={toggleSelectAll} />
          <div style={{ paddingBottom: "100px" }}>
            <CartList
              items={items}
              selectedItems={selectedItems}
              toggleSelectItem={toggleSelectItem}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              toggleSelectStore={toggleSelectStore}
              removeItems={removeItems}
            />
          </div>
          <CartFooter
            selectAll={selectAll}
            toggleSelectAll={toggleSelectAll}
            totalQuantity={totalQuantity}
            totalPrice={totalPrice}
            items={items}
            selectedItems={selectedItems}
            removeItems={removeItems}
          />
        </>
      )}
    </div>
  );
};

export default CartContainer;