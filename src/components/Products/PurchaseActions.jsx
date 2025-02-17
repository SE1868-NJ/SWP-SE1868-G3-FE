import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PurchaseActions = ({ selectedSize }) => {
    return (
        <div className="d-flex gap-3 mt-2">
            <Button
                variant="outline-danger"
                size="md"
                className="fw-bold d-flex align-items-center justify-content-center px-3 py-2"
                style={{
                    border: "1.5px solid #d70018",
                    color: "#d70018",
                    backgroundColor: "#fff",
                    fontSize: "0.9rem",
                    width: "160px",
                    height: "45px",
                    transition: "all 0.3s ease-in-out",
                }}
                disabled={!selectedSize} // Không thể bấm nếu chưa chọn kích cỡ
            >
                <span >🛒</span> Thêm Vào Giỏ Hàng
            </Button>

            <Button
                variant="danger"
                size="md"
                className="fw-bold px-3 py-2"
                style={{
                    backgroundColor: "#d70018",
                    borderColor: "#d70018",
                    fontSize: "0.9rem",
                    width: "160px",
                    height: "45px",
                    transition: "all 0.3s ease-in-out",
                }}
                disabled={!selectedSize} // Không thể bấm nếu chưa chọn kích cỡ
            >
                Mua Ngay
            </Button>
        </div>
    );
};

PurchaseActions.propTypes = {
    selectedSize: PropTypes.string,
};

export default PurchaseActions;
