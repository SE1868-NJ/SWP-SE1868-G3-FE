import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const ProductDetails = ({ product }) => {
    return (
        <Card className="border-0 bg-transparent">
            <Card.Body>
                <div className="d-flex flex-column">
                    <div className="d-flex align-items-center py-2 border-bottom">
                        <span className="fw-bold" style={{ width: "160px", flexShrink: 0 }}>Danh Mục</span>
                        <span className="fw-semibold">
                            <a href="#" className="text-decoration-none text-primary">Chợ Làng</a> &gt;
                            <a href="#" className="text-decoration-none text-primary"> {product.categoryParent || "Không có"}</a> &gt;
                            <a href="#" className="text-decoration-none text-primary"> {product.category || "Không có"}</a>
                        </span>
                    </div>

                    {[
                        { label: "Số lượng hàng khuyến mãi", value: product.promoStock },
                        { label: "Số sản phẩm còn lại", value: product.stock },
                        { label: "Thương hiệu", value: product.brand, isLink: true },
                        { label: "Mẫu", value: product.model },
                        { label: "Dịp", value: product.occasion },
                        { label: "Loại bảo hành", value: product.warrantyType },
                        { label: "Hạn bảo hành", value: product.warrantyDuration },
                        { label: "Xuất xứ", value: product.origin },
                        { label: "Khóa túi", value: product.lockType },
                        { label: "Bộ túi", value: product.bagSet },
                        { label: "Kết cấu da", value: product.leatherStructure },
                        { label: "Kích cỡ túi", value: product.size },
                        { label: "Da ngoài", value: product.outerLeather },
                        { label: "Tính năng", value: product.features },
                        { label: "Loại da", value: product.leatherType },
                        { label: "Chất liệu", value: product.material },
                        { label: "Tên tổ chức chịu trách nhiệm sản xuất", value: product.manufacturer },
                        { label: "Gửi từ", value: product.shippingFrom },
                    ].map((item, index) => (
                        <div key={index} className="d-flex align-items-center py-2 border-bottom">
                            <span className="fw-bold" style={{ width: "160px", flexShrink: 0 }}>{item.label}</span>
                            {item.isLink ? (
                                <a href="#" className="text-decoration-none text-primary fw-semibold">
                                    {item.value || "Không có"}
                                </a>
                            ) : (
                                <span className="text-muted">{item.value || "Không có"}</span>
                            )}
                        </div>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
};

ProductDetails.propTypes = {
    product: PropTypes.shape({
        categoryParent: PropTypes.string,
        category: PropTypes.string,
        promoStock: PropTypes.number,
        stock: PropTypes.number,
        brand: PropTypes.string,
        model: PropTypes.string,
        occasion: PropTypes.string,
        warrantyType: PropTypes.string,
        warrantyDuration: PropTypes.string,
        origin: PropTypes.string,
        lockType: PropTypes.string,
        bagSet: PropTypes.string,
        leatherStructure: PropTypes.string,
        size: PropTypes.string,
        outerLeather: PropTypes.string,
        features: PropTypes.string,
        leatherType: PropTypes.string,
        material: PropTypes.string,
        manufacturer: PropTypes.string,
        shippingFrom: PropTypes.string
    }).isRequired
};

export default ProductDetails;
