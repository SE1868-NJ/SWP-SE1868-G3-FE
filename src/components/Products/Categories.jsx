import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const Categories = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <>
      <h4>Danh Mục</h4>
      <Row>
        {categories.map((category, index) => (
          <Col key={index} xs={6} md={3} className="mb-3">
            <Button
              variant={
                selectedCategory === category ? "danger" : "outline-danger"
              }
              className="w-100"
              onClick={() =>
                onCategorySelect(category === selectedCategory ? "" : category)
              }
            >
              {category}
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Categories;
