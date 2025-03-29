import React from 'react';
import { Button } from 'react-bootstrap';

const PurchaseActions = ({ productId, quantity, onAddToCart, maxStock, user_id }) => {
    // Điều kiện để có thể thêm vào giỏ: số lượng > 0 và còn hàng (maxStock > 0)
    const canAddToCart = quantity > 0 && maxStock != null && maxStock > 0;
    console.log('canAddToCart', canAddToCart);

    return (
        <div className="mt-4 d-flex gap-2"> 
             <Button
                variant="outline-danger"
                onClick={() => onAddToCart(productId, user_id)}
                disabled={!canAddToCart} 
                style={{ padding: '0.75rem 1.5rem' }} 
             >
                 <i className="bi bi-cart-plus-fill me-2"></i>
                 Thêm vào Giỏ hàng
             </Button>
        </div>
    );
};

export default PurchaseActions;