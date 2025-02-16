import React from 'react';
import { Card, Button, CardFooter } from 'react-bootstrap';
import { FaSearchPlus } from 'react-icons/fa';

const ProductCard = ({ product, onZoom }) => {
  return (
    <Card className="position-relative">
      <Card.Img variant="top" src={product.img} style={{ cursor: "pointer" }} />
      <Card.Footer>
        <div
          className="position-absolute top-0 end-0 p-2 bg-danger text-white rounded-circle"
          style={{ cursor: "pointer", margin: "8px" }}
          onClick={() => onZoom(product)}
        >
          <FaSearchPlus size={18} />
        </div>
      </Card.Footer>
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
