import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cartService from '../../services/cartService';
import { useAuth } from '../../hooks/contexts/AuthContext';

const MiniCartModal = () => {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { user, cartCount } = useAuth();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1050,
    opacity: show ? 1 : 0,
    visibility: show || animating ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease',
    pointerEvents: show ? 'auto' : 'none'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '90%',
    maxWidth: '400px',
    height: '100%',
    backgroundColor: 'white',
    boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1051,
    transform: show ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    visibility: show || animating ? 'visible' : 'hidden'
  };

  const handleClose = () => {
    setAnimating(true);
    if (modalRef.current) {
      modalRef.current.style.transform = 'translateX(100%)';
    }

    setTimeout(() => {
      setShow(false);
      setAnimating(false);
    }, 300);
  };

  const handleShow = () => {
    setShow(true);
    setAnimating(true);
    fetchCartData();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (modalRef.current) {
          modalRef.current.style.transform = 'translateX(0)';
        }
        setTimeout(() => {
          setAnimating(false);
        }, 300);
      });
    });
  };

  useEffect(() => {
    const handleCartUpdated = () => {
      fetchCartData();
    };
    window.addEventListener('cart-updated', handleCartUpdated);

    const handleTransitionEnd = () => {
      if (!show) {
        setAnimating(false);
      }
    };

    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('transitionend', handleTransitionEnd);
    }

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdated);
      if (modalElement) {
        modalElement.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, []);

  const fetchCartData = async () => {
    if (show) setLoading(true);
    try {
      const cartData = await cartService.getCartsByUserId(user.id);

      const formattedItems = Array.isArray(cartData)
        ? cartData.flatMap(shop =>
          shop.items.map(item => ({
            id: item.cart_id,
            name: item.product.product_name,
            price: Number(item.product.sale_price),
            quantity: item.quantity,
            image: item.product.image_url,
            productId: item.product_id
          }))
        )
        : [];

      setItems(formattedItems);
    } catch (error) {
      setItems([]);
    } finally {
      if (show) setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await cartService.removeCartItem(id);
      setItems(items.filter(item => item.id !== id));

      const event = new CustomEvent('cart-updated');
      window.dispatchEvent(event);
    } catch (error) {
    }
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navigateTo = (path, state = null) => {
    handleClose();
    setTimeout(() => {
      navigate(path, state ? { state } : undefined);
    }, 300);
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="btn btn-outline-light border-2 position-relative"
        aria-label="Shopping Cart"
      >
        <i className="bi bi-basket-fill" />
        {cartCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartCount}
            <span className="visually-hidden">items in cart</span>
          </span>
        )}
      </button>

      <div style={overlayStyle} onClick={handleClose}></div>

      <div ref={modalRef} style={modalStyle}>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="m-0">Giỏ hàng ({cartCount})</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </div>

        <div className="flex-grow-1 overflow-auto">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-4">
              <img
                src="http://127.0.0.1:9000/data/cart/1741942901268_empty-cart.png"
                alt="Empty Cart"
                className="mb-3"
                style={{ maxWidth: '150px', height: 'auto' }}
              />
              <p className="mb-3">Giỏ hàng hiện tại đang trống</p>
              <button
                className="btn btn-danger"
                onClick={handleClose}
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
            <div>
              {items.map(item => (
                <div key={item.id} className="border-bottom p-3">
                  <div className="d-flex">
                    <div className="me-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-decoration-none text-dark fw-bold"
                          onClick={handleClose}
                        >
                          {item.name.length > 30 ? `${item.name.substring(0, 30)}...` : item.name}
                        </Link>
                        <button
                          className="btn btn-sm text-danger p-0"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                      <div className="d-flex justify-content-between align-items-end mt-2">
                        <div>
                          <span>Số lượng: {item.quantity}</span>
                        </div>
                        <div className="text-danger fw-bold">
                          {(item.price * item.quantity).toLocaleString()}đ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-top p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold">Tổng thanh toán ({totalItems} sản phẩm)</span>
              <span className="fw-bold text-danger">{totalPrice.toLocaleString()}đ</span>
            </div>
            <div className="d-flex justify-content-between gap-2">
              <button
                className="btn btn-outline-secondary flex-grow-1"
                onClick={() => navigateTo('/order/cart')}
              >
                XEM GIỎ HÀNG
              </button>
              <button
                className="btn btn-danger flex-grow-1"
                onClick={() => navigateTo('/order/checkout', { selectedProducts: items })}
              >
                MUA HÀNG
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniCartModal;