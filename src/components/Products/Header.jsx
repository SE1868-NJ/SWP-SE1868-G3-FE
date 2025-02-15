import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';

const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <Navbar bg="danger" variant="dark" expand="lg" className="px-3">
      <Navbar.Brand href="#">Chợ Làng</Navbar.Brand>
      <Form className="d-flex ms-auto">
        <FormControl
          type="search"
          placeholder="Tìm sản phẩm..."
          className="me-2"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Button variant="outline-light">Tìm</Button>
      </Form>
      <Button variant="outline-light" className="ms-3">
        <BsCart size={24} />
      </Button>
    </Navbar>
  );
};

export default Header;