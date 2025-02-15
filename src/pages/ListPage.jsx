import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Products/Header";
import Categories from "../components/Products/Categories";
import FlashSale from "../components/Products/FlashSale";
import ProductList from "../components/Products/ProductList";
import CustomPagination from "../components/Products/CustomPagination";
import ChatPopup from '../components/Chats/ChatPopup';
import { productService } from "../services/productService";

const mockUserId = 15;
const itemsPerPage = 8;
const flashSaleItems = 4;

function ListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [flashSaleIndex, setFlashSaleIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          productService.getListCategory()
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error)),

          productService.getListProduct()
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error))
        ]);
      } catch (error) {
        console.error('Error in data fetching:', error);
      }
    };

    fetchData();
  }, []);

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
      (!selectedCategory || product.category_id.name === selectedCategory)
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
          products={products}
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