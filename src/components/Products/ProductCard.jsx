import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Card.Img variant="top" src={product.img} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price} VND</Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="danger" size="sm">
            Mua Ngay
          </Button>
          <Button variant="outline-danger" size="sm">
            Thêm vào giỏ hàng
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
