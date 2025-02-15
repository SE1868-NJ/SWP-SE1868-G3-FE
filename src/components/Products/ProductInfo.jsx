import React from "react";
import { Button } from "react-bootstrap";

const ProductInfo = ({ product }) => {
    return (
        <div>
            <h2>{product.name}</h2>
            <p>
                Giá: <span className="text-danger fw-bold">{product.price} VND</span>
            </p>
            <p>Kho: {product.stock} sản phẩm</p>
            <Button variant="danger" size="lg">
                Thêm vào giỏ hàng
            </Button>
        </div>
    );
};

export default ProductInfo;
