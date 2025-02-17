import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Header = ({ searchTerm, onSearchChange, countCart }) => {
  const navigate = useNavigate();

  const handCartClick = () => {
    navigate('/cart');
  }

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
      <Button
        variant="outline-light"
        className="ms-3 position-relative"
        onClick={handCartClick}
      >
        <BsCart size={24} />
        {countCart > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-danger">
            {countCart}
            <span className="visually-hidden">sản phẩm trong giỏ hàng</span>
          </span>
        )}
      </Button>
    </Navbar>
  );
};

export default Header;