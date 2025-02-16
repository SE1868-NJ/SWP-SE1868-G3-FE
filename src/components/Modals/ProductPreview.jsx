import React from 'react';
import { Modal } from 'react-bootstrap';
import { Row, Col, Button } from 'react-bootstrap';

const ProductPreview = ({ showDetail, handleCloseDetail, selectedProduct }) => {
    return (
        <Modal show={showDetail} onHide={handleCloseDetail} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{selectedProduct?.product_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <img src={selectedProduct?.image_url} alt={selectedProduct?.product_name} className="img-fluid rounded" />
                    </Col>
                    <Col md={6}>
                        <h4>{selectedProduct?.product_name}</h4>
                        <p><strong>Giá:</strong> <span className="text-danger fw-bold">{selectedProduct?.sale_price} VND</span></p>
                        <p><strong>Kho:</strong> {selectedProduct?.stock_quantity} sản phẩm</p>
                        <p>{selectedProduct?.description}</p>
                        <Button variant="danger">Thêm vào giỏ hàng</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ProductPreview;