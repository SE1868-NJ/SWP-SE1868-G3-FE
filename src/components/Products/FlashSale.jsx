import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

const FlashSale = ({ products, onPrev, onNext, onZoom }) => {
  return (
    <>
      <h4 className="mt-4 d-flex justify-content-between align-items-center">
        Flash Sale
        <div>
          <Button variant="outline-danger" onClick={onPrev}>
            <FaChevronLeft />
          </Button>
          <Button variant="outline-danger" onClick={onNext} className="ms-2">
            <FaChevronRight />
          </Button>
        </div>
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

export default FlashSale;
