import { Badge, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ShopDiscounts = ({ discounts }) => {
    return (
        <div className="d-flex align-items-center gap-4 mt-2">

            <h6 className="text-muted mb-0">Mã Giảm Giá <br></br>Của Shop</h6>

            {/* Các nút giảm giá */}
            <div className="d-flex gap-2">
                {discounts.map((discount, index) => (
                    <Button
                        key={index}
                        variant="light"
                        className="border border-danger text-danger fw-bold px-3 py-1"
                        style={{
                            borderRadius: "5px",
                            fontSize: "0.85rem",
                            backgroundColor: "#fff5f5",
                            borderStyle: "dashed",
                        }}
                    >
                        Giảm {discount}
                    </Button>
                ))}
            </div>
        </div>
    );
};

ShopDiscounts.propTypes = {
    discounts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ShopDiscounts;
