import { Badge, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import ShippingInfo from './ShippingInfo';
import PurchaseActions from './PurchaseActions';
import ShopDiscounts from './ShopDiscounts';
import Media from './Media';

const reviewsData = {
    rating: 4.9,
    total: 4300,
};
const soldQuantity = 11300;

const ProductInfo = ({
    product,
    selectedSize,
    quantity,
    onSizeSelect,
    onQuantityChange
}) => (
    <div className="d-flex flex-column gap-3">
        {/* Tên sản phẩm */}
        <h1 className="fw-bold mb-1" style={{ fontSize: '1.8rem' }}>{product.name}</h1>

        {/* Đánh giá */}
        <div className="d-flex align-items-center gap-3 mt-1" style={{ fontSize: "0.9rem", color: "#666" }}>
            <span className="fw-bold text-dark">{reviewsData.rating.toFixed(1)}</span>
            <div className="d-flex align-items-center text-warning">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.round(reviewsData.rating) ? "text-warning" : "text-muted"}>
                        ★
                    </span>
                ))}
            </div>
            <span>
                <strong>{reviewsData.total.toLocaleString()}</strong> Đánh Giá
            </span>
            <span>
                <strong>{soldQuantity.toLocaleString()}</strong> Sold
            </span>
        </div>

        {/* Giá */}
        <div className="mt-2 d-flex align-items-center gap-3">
            {product.oldPrice && (
                <del className="text-muted fs-5">{product.oldPrice?.toLocaleString('vi-VN') || "0"} VND</del>
            )}
            <h2 className="text-danger mb-0 fw-bold">{product.price ? product.price.toLocaleString('vi-VN') : "0"} VND</h2>
        </div>

        {/* Mô tả */}
        <p className="text-muted" style={{ lineHeight: '1.6' }}>
            {product.description ||
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
            maxStock={product.stock || 0}
            onChange={onQuantityChange}
            selectedSize={selectedSize}
        />

        {/* Mua */}
        <PurchaseActions selectedSize={selectedSize} />

        {/* Chia sẻ */}
        <Media />
    </div>
);

ProductInfo.propTypes = {
    product: PropTypes.object.isRequired,
    selectedSize: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    onSizeSelect: PropTypes.func.isRequired,
    onQuantityChange: PropTypes.func.isRequired
};

export default ProductInfo;
