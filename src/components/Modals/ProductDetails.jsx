import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { FaShoppingCart, FaHeart, FaExchangeAlt } from "react-icons/fa";

function ProductDetails({ product, show, handleClose }) {
    if (!product) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Img variant="top" src={product.img} alt={product.name} className="img-fluid" />
                        </Card>
                    </Col>

                    <Col md={6}>
                        <h4>{product.name}</h4>
                        <p><strong>Thương hiệu:</strong> {product.brand || "Không có"}</p>

                        <div className="d-flex align-items-center">
                            {product.oldPrice && (
                                <del className="text-muted me-2">{product.oldPrice} VND</del>
                            )}
                            <span className="text-danger fw-bold">{product.price} VND</span>
                        </div>

                        <p><strong>Còn trong kho:</strong> {product.stock || "100"} sản phẩm</p>
                        <p className="text-muted">{product.description || "Thông tin sản phẩm đang được cập nhật."}</p>

                        <div className="d-flex gap-2 mt-3">
                            <Button variant="danger">
                                <FaShoppingCart /> Thêm vào giỏ hàng
                            </Button>
                            <Button variant="outline-secondary">
                                <FaHeart /> Yêu thích
                            </Button>
                            <Button variant="outline-primary">
                                <FaExchangeAlt /> So sánh
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

ProductDetails.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        brand: PropTypes.string,
        oldPrice: PropTypes.number,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number,
        description: PropTypes.string,
    }),
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ProductDetails;