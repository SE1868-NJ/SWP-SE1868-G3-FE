import React, { useState } from "react";
import { Container, Modal, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Products/Header";
import Categories from "../components/Products/Categories";
import FlashSale from "../components/Products/FlashSale";
import ProductList from "../components/Products/ProductList";
import CustomPagination from "../components/Products/CustomPagination";
import ChatPopup from '../components/Chats/ChatPopup';
import { FaSearchPlus } from "react-icons/fa";

const categories = ["Đồ ăn", "Đồ uống", "Đồ tươi sống", "Đồ chay"];

const products = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Sản phẩm ${i + 1}`,
  price: parseFloat((Math.random() * 900 + 100).toFixed(3)),
  img: "https://vnaroma.com/wp-content/uploads/2020/10/bi-quyet-chuan-bi-gia-vi-nau-bun-bo-hue-chuan-vi-01.jpg",
  category: categories[Math.floor(Math.random() * categories.length)],
  brand: "Local Brand",
  stock: 100,
  description: "Mô tả sản phẩm đang cập nhật...",
}));

const mockUserId = 15;
const itemsPerPage = 8;
const flashSaleItems = 4;

function ListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [flashSaleIndex, setFlashSaleIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

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

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    setShowDetail(false);
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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Container className="mt-4">
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <FlashSale
          products={products.slice(flashSaleIndex, flashSaleIndex + flashSaleItems)}
          onPrev={handleFlashSalePrev}
          onNext={handleFlashSaleNext}
          onZoom={handleOpenDetail}  // Thêm sự kiện phóng to
        />

        <ProductList
          products={displayedProducts}
          onPriceRangeChange={setPriceRange}
          onZoom={handleOpenDetail}  // Thêm sự kiện phóng to
        />

        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>

      <ChatPopup userId={mockUserId} />

      <Modal show={showDetail} onHide={handleCloseDetail} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img src={selectedProduct?.img} alt={selectedProduct?.name} className="img-fluid rounded" />
            </Col>
            <Col md={6}>
              <h4>{selectedProduct?.name}</h4>
              <p><strong>Giá:</strong> <span className="text-danger fw-bold">{selectedProduct?.price} VND</span></p>
              <p><strong>Kho:</strong> {selectedProduct?.stock} sản phẩm</p>
              <p>{selectedProduct?.description}</p>
              <Button variant="danger">Thêm vào giỏ hàng</Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ListPage;