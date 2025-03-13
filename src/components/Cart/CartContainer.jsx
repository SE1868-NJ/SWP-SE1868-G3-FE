import React, { useState, useEffect, useMemo } from "react";
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
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
        setItems([]);
        setSelectedItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCartData();
  }, [user.id]);

  useEffect(() => {
    setSelectAll(items.length > 0 && selectedItems.length === items.length);
  }, [items, selectedItems]);

  const updateQuantity = async (id, newQuantity) => {
    const item = items.find(item => item.id === id);
    if (!item) return;
    try {
      await cartService.updateCartQuantity(id, newQuantity);
      setItems(items.map(i => i.id === id ? { ...i, quantity: newQuantity } : i));
    } catch (error) {
    }
  };

  const removeItem = async (id) => {
    try {
      await cartService.removeCartItem(id);
      setItems(items.filter(item => item.id !== id));
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } catch (error) {
    }
  };

  const removeItems = async (itemIds) => {
    try {
      await cartService.removeMultipleCartItems(itemIds);
      setItems(items.filter(item => !itemIds.includes(item.id)));
      setSelectedItems(selectedItems.filter(id => !itemIds.includes(id)));
    } catch (error) {
    }
  };

  const toggleSelectItem = (id) => {
    const numId = Number(id);
    setSelectedItems(prev =>
      prev.includes(numId)
        ? prev.filter(itemId => itemId !== numId)
        : [...prev, numId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(selectAll ? [] : items.map(item => item.id));
    setSelectAll(!selectAll);
  };

  const toggleSelectStore = (storeName) => {
    const storeItems = items.filter(item => item.storeName === storeName).map(item => item.id);
    const allStoreItemsSelected = storeItems.every(id => selectedItems.includes(id));
    if (allStoreItemsSelected) {
      setSelectedItems(prev => prev.filter(id => !storeItems.includes(id)));
    } else {
      setSelectedItems(prev => [...new Set([...prev, ...storeItems])]);
    }
  };

  const totalQuantity = useMemo(() =>
    selectedItems.reduce((sum, id) => {
      const item = items.find(item => item.id === id);
      return sum + (item ? item.quantity : 0);
    }, 0),
    [selectedItems, items]);

  const totalPrice = useMemo(() =>
    selectedItems.reduce((sum, id) => {
      const item = items.find(i => i.id === id);
      return sum + (item ? item.price * item.quantity : 0);
    }, 0),
    [selectedItems, items]);

  if (loading) return <div>Loading...</div>;

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
            onClick={() => navigate("/")}
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
          <CartHeader
            totalItems={items.length}
            selectAll={selectAll}
            toggleSelectAll={toggleSelectAll}
          />
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