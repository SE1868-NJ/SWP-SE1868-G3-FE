import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SizeSelector = ({ selectedSize, onSelect }) => (
    <div className="d-flex align-items-center gap-3 mt-2">
        <h6 className="text-muted mb-2">Chọn kích cỡ </h6>
        <div className="d-flex gap-2 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
                <Button
                    key={size}
                    variant={selectedSize === size ? "dark" : "outline-secondary"}
                    className="px-4 py-2 rounded-pill"
                    onClick={() => onSelect(size)}
                >
                    {size}
                </Button>
            ))}
        </div>
    </div>
);

SizeSelector.propTypes = {
    selectedSize: PropTypes.string,
    onSelect: PropTypes.func.isRequired
};

export default SizeSelector;
