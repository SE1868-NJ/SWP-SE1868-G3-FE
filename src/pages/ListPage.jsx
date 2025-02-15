import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Products/Header";
import Categories from "../components/Products/Categories";
import FlashSale from "../components/Products/FlashSale";
import ProductList from "../components/Products/ProductList";
import CustomPagination from "../components/Products/CustomPagination";
import ChatPopup from '../components/Chats/ChatPopup';

const categories = ["Đồ ăn", "Đồ uống", "Đồ tươi sống", "Đồ chay"];

const products = Array.from({ length: 50 }, (_, i) => ({
  name: `Sản phẩm ${i + 1}`,
  price: parseFloat((Math.random() * 900 + 100).toFixed(3)),
  img: "https://vnaroma.com/wp-content/uploads/2020/10/bi-quyet-chuan-bi-gia-vi-nau-bun-bo-hue-chuan-vi-01.jpg",
  category: categories[Math.floor(Math.random() * categories.length)],
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
        />

        <ProductList
          products={displayedProducts}
          onPriceRangeChange={setPriceRange}
        />

        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>

      <ChatPopup userId={mockUserId} />
    </>
  );
}

export default ListPage;