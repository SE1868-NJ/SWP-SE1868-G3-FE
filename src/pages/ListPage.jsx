import React, { useState, useEffect } from "react";
import { Container, Modal, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Products/Header";
import Categories from "../components/Products/Categories";
import FlashSale from "../components/Products/FlashSale";
import ProductList from "../components/Products/ProductList";
import CustomPagination from "../components/Products/CustomPagination";
import ChatPopup from '../components/Chats/ChatPopup';
import { FaSearchPlus } from "react-icons/fa";
import { productService } from "../services/productService";
import ProductPreview from "../components/Modals/ProductPreview";

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
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      const response = await productService.getProducts(params);
      setProducts(response.items);
      setTotalPages(response.metadata.totalPages);

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
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

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    setShowDetail(false);
  };

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
          onZoom={handleOpenDetail}
        />

        <ProductList
          products={products}
          onZoom={handleOpenDetail}
        />

        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>

      <ChatPopup userId={mockUserId} />

      <ProductPreview
        showDetail={showDetail}
        handleCloseDetail={handleCloseDetail}
        selectedProduct={selectedProduct} />
    </>
  );
}

export default ListPage;