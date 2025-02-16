import React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products, onZoom }) => {
  return (
    <>
      <h4 className="mt-4 d-flex justify-content-between align-items-center">
        Tất Cả Sản Phẩm
        {/* <Dropdown>
          <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
            Lọc theo giá
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onPriceRangeChange([0, 500])}>
              Dưới 500 VND
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onPriceRangeChange([500, 1000])}>
              500 - 1000 VND
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onPriceRangeChange([0, 1000])}>
              Tất cả
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </h4>
      <Row>
        {products.map((product, index) => (
          <Col key={index} xs={6} md={3} className="mb-3">
            <ProductCard product={product} onZoom={onZoom} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductList;
