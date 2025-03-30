import React from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';

const ProductPreview = ({ showDetail, handleCloseDetail, selectedProduct, onAddToCart, user_id }) => {
    const handleAddToCart = () => {
        if (selectedProduct && onAddToCart) {
            onAddToCart(selectedProduct.id, user_id);
        }
    };

    return (
        <Modal show={showDetail} onHide={handleCloseDetail} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{selectedProduct?.product_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <img
                            src={selectedProduct?.image_url}
                            alt={selectedProduct?.product_name}
                            className="img-fluid rounded"
                            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                        />
                    </Col>
                    <Col md={6}>
                        <h4>{selectedProduct?.product_name}</h4>
                        <p><strong>Giá:</strong> <span className="text-danger fw-bold">{selectedProduct?.sale_price?.toLocaleString()} VND</span></p>
                        <p><strong>Kho:</strong> {selectedProduct?.stock_quantity} sản phẩm</p>
                        <p className="mb-4">{selectedProduct?.product_description}</p>
                        <div className="d-grid gap-2">
                            <Button variant="danger" onClick={handleAddToCart}>
                                Thêm vào giỏ hàng
                            </Button>
                            <Button variant="outline-secondary" onClick={handleCloseDetail}>
                                Đóng
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ProductPreview;