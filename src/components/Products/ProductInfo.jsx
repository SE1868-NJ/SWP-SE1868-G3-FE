import React from 'react'; // Thêm import React nếu chưa có
// Components
import PurchaseActions from './PurchaseActions';
import QuantitySelector from './QuantitySelector';
import ShippingInfo from './ShippingInfo';
import ShopDiscounts from './ShopDiscounts';

const ProductInfo = ({
    product,
    quantity,
    onQuantityChange,
    onAddToCart,
    user_id
}) => {
    if (!product) return null;

    const hasStock = product.stock_quantity != null && product.stock_quantity > 0;
    const availableDiscounts = product.shop?.vouchers || product.discounts || [];
    const hasDiscounts = availableDiscounts.length > 0;

    return (
        <div className="d-flex flex-column gap-3"> 
            {product.product_name && (
                <h1 className="fw-bold mb-1" style={{ fontSize: '1.8rem', lineHeight: '1.3' }}>
                    {product.product_name}
                </h1>
            )}
            {product.sale_price != null && (
                <div className="mt-2 d-flex align-items-center flex-wrap gap-2 bg-light p-3 rounded shadow-sm">
                    {product.price && product.price > product.sale_price && (
                        <del className="text-muted fs-5">{product.price?.toLocaleString('vi-VN')} ₫</del>
                    )}
                    <h2 className="text-danger mb-0 fw-bold me-2">{product.sale_price?.toLocaleString('vi-VN')} ₫</h2>
                    {product.price && product.price > product.sale_price && (
                        <span className="badge bg-danger fs-6">
                            -{Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                        </span>
                    )}
                </div>
            )}

            {product.product_description && (
                <div className="mt-2">
                    <h5 className="fw-semibold mb-2">Mô tả sản phẩm:</h5>
                    <p className="text-muted" style={{ lineHeight: '1.6' }}>
                        {product.product_description}
                    </p>
                </div>
            )}

            {hasDiscounts && <ShopDiscounts discounts={availableDiscounts} />}

            <ShippingInfo productId={product.id} />

            {hasStock ? (
                <>
                    <QuantitySelector
                        quantity={quantity}
                        maxStock={product.stock_quantity} 
                        onChange={onQuantityChange} 
                    />
                    <PurchaseActions
                        productId={product.id}
                        quantity={quantity}
                        onAddToCart={onAddToCart} 
                        maxStock={product.stock_quantity}
                        user_id= {user_id} 
                    />
                </>
            ) : (
                <div className='alert alert-warning text-center mt-3' role='alert'>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Sản phẩm hiện đã hết hàng!
                </div>
            )}

        </div>
    );
};

export default ProductInfo;