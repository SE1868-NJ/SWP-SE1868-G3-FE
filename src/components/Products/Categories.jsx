import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Categories = ({ categories, onCategorySelect, selectedCategory }) => {
  // Limit categories to a reasonable number (e.g., 12)
  const limitedCategories = categories.slice(0, 12);

  return (
    <Container fluid className="px-0 mb-4">
      <h4 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#333',
        borderLeft: '4px solid #dc3545',
        paddingLeft: '10px'
      }}>
        Danh Mục
      </h4>

      <Row className="g-2">
        {limitedCategories.map((category, index) => (
          <Col xs={6} sm={4} md={3} key={`cat-${index}`}>
            <div
              onClick={() => onCategorySelect(category)}
              style={{
                padding: '10px',
                textAlign: 'center',
                backgroundColor: selectedCategory === category ? '#dc3545' : '#f8f9fa',
                color: selectedCategory === category ? 'white' : '#333',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                border: selectedCategory === category ? 'none' : '1px solid #dee2e6',
                fontWeight: selectedCategory === category ? '600' : 'normal'
              }}
            >
              {category}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;