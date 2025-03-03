import PurchaseActions from './PurchaseActions';
import QuantitySelector from './QuantitySelector';
import ShippingInfo from './ShippingInfo';
import ShopDiscounts from './ShopDiscounts';
import SizeSelector from './SizeSelector';
// import Media from './Media';

const ProductInfo = ({
    product,
    selectedSize,
    quantity,
    onSizeSelect,
    onQuantityChange
}) => (
    <div className="d-flex flex-column gap-3">
        {/* Tên sản phẩm */}
        <h1 className="fw-bold mb-1" style={{ fontSize: '1.8rem' }}>{product.product_name}</h1>

        {/* Đánh giá */}
        <div className="d-flex align-items-center gap-3 mt-1" style={{ fontSize: "0.9rem", color: "#666" }}>
        <span className="fw-bold text-dark">
    {typeof product.rating === 'number' ? product.rating.toFixed(1) : 'N/A'}
</span>

            <div className="d-flex align-items-center">
                {[...Array(5)].map((_, i) => {
                    const percentage = product.rating - i;

                    return (
                        <span
                            key={i}
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                                color: '#e4e5e9'
                            }}
                        >
                            ★
                            <span
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: percentage > 1 ? '100%' : `${Math.max(0, percentage * 100)}%`,
                                    overflow: 'hidden',
                                    color: '#ffc107'
                                }}
                            >
                                ★
                            </span>
                        </span>
                    );
                })}
            </div>
            <span>
                <strong>{product.count_feedback}</strong> Đánh Giá
            </span>
            {/* <span>
                <strong>{soldQuantity.toLocaleString()}</strong> Sold
            </span> */}
        </div>

        {/* Giá */}
        <div className="mt-2 d-flex align-items-center gap-3">
            {/* {product.oldPrice && (
                <del className="text-muted fs-5">{product.oldPrice?.toLocaleString('vi-VN') || "0"} VND</del>
            )} */}
            <h2 className="text-danger mb-0 fw-bold">{product.sale_price ? product.sale_price.toLocaleString('vi-VN') : "0"} VND</h2>
        </div>

        {/* Mô tả */}
        <p className="text-muted" style={{ lineHeight: '1.6' }}>
            {product.product_description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo."
            }
        </p>

        {/* Thông tin giảm giá */}
        <ShopDiscounts discounts={["₫25k", "₫100k"]} />

        {/* Thông tin giao hàng */}
        <ShippingInfo />

        {/* Kích cỡ */}
        <SizeSelector selectedSize={selectedSize} onSelect={onSizeSelect} />

        {/* Chọn số lượng */}
        <QuantitySelector
            quantity={quantity}
            maxStock={product.stock_quantity || 0}
            onChange={onQuantityChange}
            selectedSize={selectedSize}
        />

        {/* Mua */}
        <PurchaseActions selectedSize={selectedSize} />

        {/* Chia sẻ */}
        {/* <Media /> */}
    </div>
);

export default ProductInfo;
