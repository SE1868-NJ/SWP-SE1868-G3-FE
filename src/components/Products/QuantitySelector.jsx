import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const QuantitySelector = ({ quantity, maxStock, onChange, selectedSize }) => {
    const handleChange = (e) => {
        if (!selectedSize) return; 
        let value = parseInt(e.target.value) || 1;
        value = Math.max(1, Math.min(value, maxStock));
        onChange(value);
    };

    return (
        <div className="d-flex align-items-center gap-5 mt-2">

            <h6 className="text-muted mb-2">Số lượng</h6>
            <Form.Control
                type="number"
                value={selectedSize ? quantity : ""}
                min="1"
                max={maxStock}
                onChange={handleChange}
                style={{ width: "80px", textAlign: "center", backgroundColor: selectedSize ? "#fff" : "#f5f5f5" }}
                disabled={!selectedSize} // Không thể nhập nếu chưa chọn kích cỡ
            />
            <span className="ms-0 text-muted" style={{ fontSize: "0.85rem" }}>
                {selectedSize ? `${maxStock.toLocaleString()} sản phẩm có sẵn` : "Hãy chọn kích cỡ"}
            </span>
        </div>
    );
};


export default QuantitySelector;
