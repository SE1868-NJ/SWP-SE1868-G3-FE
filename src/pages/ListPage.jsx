import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Navbar,
  Pagination,
  Row,
} from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = ["Đồ ăn", "Đồ uống", "Đồ tươi sống", "Đồ chay"];

const products = Array.from({ length: 50 }, (_, i) => ({
  name: `Sản phẩm ${i + 1}`,
  price: parseFloat((Math.random() * 900 + 100).toFixed(3)),
  img: "https://vnaroma.com/wp-content/uploads/2020/10/bi-quyet-chuan-bi-gia-vi-nau-bun-bo-hue-chuan-vi-01.jpg",
  category: categories[Math.floor(Math.random() * categories.length)],
}));

const itemsPerPage = 8;
const flashSaleItems = 4;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [flashSaleIndex, setFlashSaleIndex] = useState(0);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFlashSaleNext = () => {
    if (flashSaleIndex + flashSaleItems < products.length) {
      setFlashSaleIndex(flashSaleIndex + 1);
    }
  };

  const handleFlashSalePrev = () => {
    if (flashSaleIndex > 0) {
      setFlashSaleIndex(flashSaleIndex - 1);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar bg="danger" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand href="#">Chợ Làng</Navbar.Brand>
        <Form className="d-flex ms-auto">
          <FormControl
            type="search"
            placeholder="Tìm sản phẩm..."
            className="me-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-light">Tìm</Button>
        </Form>
        <Button variant="outline-light" className="ms-3">
          <BsCart size={24} />
        </Button>
      </Navbar>

      <Container className="mt-4">
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
                  setSelectedCategory(
                    category === selectedCategory ? "" : category
                  )
                }
              >
                {category}
              </Button>
            </Col>
          ))}
        </Row>

        <h4 className="mt-4 d-flex justify-content-between align-items-center">
          Flash Sale
          <div>
            <Button variant="outline-danger" onClick={handleFlashSalePrev}>
              <FaChevronLeft />
            </Button>
            <Button
              variant="outline-danger"
              onClick={handleFlashSaleNext}
              className="ms-2"
            >
              <FaChevronRight />
            </Button>
          </div>
        </h4>
        <Row>
          {products
            .slice(flashSaleIndex, flashSaleIndex + flashSaleItems)
            .map((product, index) => (
              <Col key={index} xs={6} md={3} className="mb-3">
                <Card>
                  <Card.Img variant="top" src={product.img} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.price} VND</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="danger" size="sm">
                        Mua Ngay
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        Thêm vào giỏ hàng
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>

        <h4 className="mt-4">Tất Cả Sản Phẩm</h4>
        <Row>
          {displayedProducts.map((product, index) => (
            <Col key={index} xs={6} md={3} className="mb-3">
              <Card>
                <Card.Img variant="top" src={product.img} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.price} VND</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="danger" size="sm">
                      Mua Ngay
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Pagination className="mt-3 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </Pagination.Prev>
          {[...Array(totalPages).keys()].map((num) =>
            num + 1 <= currentPage + 2 && num + 1 >= currentPage - 2 ? (
              <Pagination.Item
                key={num + 1}
                active={num + 1 === currentPage}
                onClick={() => handlePageChange(num + 1)}
              >
                {num + 1}
              </Pagination.Item>
            ) : null
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </Pagination.Next>
        </Pagination>
      </Container>
    </>
  );
}

export default App;
