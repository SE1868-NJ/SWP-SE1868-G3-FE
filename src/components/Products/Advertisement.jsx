import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Advertisement = ({ images, currentImageIndex, onNext, onPrev }) => {
  return (
    <>
      <h4 className="mt-4 d-flex justify-content-between align-items-center">
        Quảng cáo
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
        <Col>
          <img
            src={images[currentImageIndex]}
            alt="Quảng cáo"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Advertisement;
