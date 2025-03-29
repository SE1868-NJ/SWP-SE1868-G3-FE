import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const QuantitySelector = ({ quantity, maxStock, onChange, selectedSize }) => {

    const handleChange = (e) => {
        let value = parseInt(e.target.value) || 1;
        value = Math.max(1, Math.min(value, maxStock));
        onChange(value);
    };

    return (
        <div className="d-flex align-items-center gap-5 mt-2">

            <h6 className="text-muted mb-2">Số lượng</h6>
            <Form.Control
                type="number"
                value={quantity || 1}
                min="1"
                max={maxStock}
                onChange={handleChange}
                style={{ width: "80px", textAlign: "center", backgroundColor: "#fff" }}
            />
        </div>
    );
};


export default QuantitySelector;
