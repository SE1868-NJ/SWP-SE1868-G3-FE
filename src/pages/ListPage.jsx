import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ChatPopup from "../components/Chats/ChatPopup";
import Advertisement from "../components/Products/Advertisement";
import Categories from "../components/Products/Categories";
import CustomPagination from "../components/Products/CustomPagination";
import FlashSale from "../components/Products/FlashSale";
import Header from "../components/Products/Header";
import ProductList from "../components/Products/ProductList";
import TopSearch from "../components/Products/TopSearch";

const categories = ["Đồ ăn", "Đồ uống", "Đồ tươi sống", "Đồ chay"];

const images = [
  "https://www.eamgroup.vn/Huu-ich/Images/Post/49OAqx2503.jpg",
  "https://i.ytimg.com/vi/C1P1Cw9J1-I/maxresdefault.jpg",
  "https://example.com/image3.jpg",
];

const products = Array.from({ length: 50 }, (_, i) => ({
  name: `Sản phẩm ${i + 1}`,
  price: parseFloat((Math.random() * 900 + 100).toFixed(3)),
  img: "https://vnaroma.com/wp-content/uploads/2020/10/bi-quyet-chuan-bi-gia-vi-nau-bun-bo-hue-chuan-vi-01.jpg",
  category: categories[Math.floor(Math.random() * categories.length)],
}));

const topSearchProducts = Array.from({ length: 8 }, (_, i) => ({
  name: `Sản phẩm ${i + 1}`,
  price: parseFloat((Math.random() * 900 + 100).toFixed(3)),
  img: "https://vnaroma.com/wp-content/uploads/2020/10/bi-quyet-chuan-bi-gia-vi-nau-bun-bo-hue-chuan-vi-01.jpg",
  category: categories[Math.floor(Math.random() * categories.length)],
}));

const mockUserId = 15;
const itemsPerPage = 8;
const flashSaleItems = 4;
const topSearchItems = 4;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ListPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const selectedCategory = query.get("category") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  //const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [flashSaleIndex, setFlashSaleIndex] = useState(0);
  const [topSearchIndex, setTopSearchIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleTopSearchNext = () => {
    if (topSearchIndex + topSearchItems < topSearchProducts.length) {
      setTopSearchIndex(topSearchIndex + 1);
    }
  };

  const handleTopSearchPrev = () => {
    if (topSearchIndex > 0) {
      setTopSearchIndex(topSearchIndex - 1);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleCategorySelect = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
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
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <Container className="mt-4">
        <Advertisement
          images={images}
          currentImageIndex={currentImageIndex}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />

        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        <FlashSale
          products={products.slice(
            flashSaleIndex,
            flashSaleIndex + flashSaleItems
          )}
          onPrev={handleFlashSalePrev}
          onNext={handleFlashSaleNext}
        />
        <TopSearch
          topSearchProducts={topSearchProducts.slice(
            topSearchIndex,
            topSearchIndex + topSearchItems
          )}
          onPrev={handleTopSearchPrev}
          onNext={handleTopSearchNext}
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
