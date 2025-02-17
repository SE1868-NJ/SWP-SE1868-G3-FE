import React from 'react';
import { Card, Button, CardFooter } from 'react-bootstrap';
import { FaSearchPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onZoom, onAddToCart, user_id }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${product.id || product._id || product.product_id}`);
  };

  return (
    <Card className="position-relative">
      <Card.Img
        variant="top"
        src={product.image_url || product.img}
        style={{ cursor: "pointer" }}
        onClick={handleNavigate}
      />
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
        <Card.Title onClick={handleNavigate} style={{ cursor: "pointer" }}>
          {product.product_name || product.name}
        </Card.Title>
        <Card.Text>{product.sale_price?.toLocaleString() || product.price?.toLocaleString()} VND</Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="danger" size="sm">
            Mua Ngay
          </Button>
          <Button variant="outline-danger" size="sm"
            onClick={() => onAddToCart(product.id || product._id || product.product_id, user_id)}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
