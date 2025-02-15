import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

const TopSearch = ({ topSearchProducts, onPrev, onNext }) => {
  return (
    <>
      <h4 className="mt-4 d-flex justify-content-between align-items-center">
        Top Search
        <div>
          <Button variant="outline-primary" onClick={onPrev}>
            <FaChevronLeft />
          </Button>
          <Button variant="outline-primary" onClick={onNext} className="ms-2">
            <FaChevronRight />
          </Button>
        </div>
      </h4>
      <Row>
        {topSearchProducts.map((product, index) => (
          <Col key={index} xs={6} md={3} className="mb-3">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TopSearch;
