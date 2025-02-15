import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Categories = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <>
      <h4>Danh Mục</h4>
      <Row>
        {categories.map((category, index) => (
          <Col key={index} xs={6} md={3} className="mb-3">
            <Button
              variant={selectedCategory === category.name ? "danger" : "outline-danger"}
              className="w-100"
              onClick={() => onCategorySelect(category.name === selectedCategory ? "" : category.name)}
            >
              {category.name}
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Categories;