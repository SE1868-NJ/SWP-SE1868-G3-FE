import { useLocation, useNavigate } from "react-router-dom";
import Advertisement from "../components/Products/Advertisement";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Categories from "../components/Products/Categories";
import CustomPagination from "../components/Products/CustomPagination";
import FlashSale from "../components/Products/FlashSale";
import Header from "../components/Products/Header";
import ProductList from "../components/Products/ProductList";
import TopSearch from "../components/Products/TopSearch";
import { productService } from "../services/productService";
import ProductPreview from "../components/Modals/ProductPreview";
import NotificationToast from "../components/Toast/NotificationToast";

const categories = ["Đồ ăn", "Đồ uống", "Đồ tươi sống", "Đồ chay"];

const images = [
  "https://www.eamgroup.vn/Huu-ich/Images/Post/49OAqx2503.jpg",
  "https://i.ytimg.com/vi/C1P1Cw9J1-I/maxresdefault.jpg",
  "https://example.com/image3.jpg",
];

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
  // const [priceRange, setPriceRange] = useState([0, 1000]);
  const [flashSaleIndex, setFlashSaleIndex] = useState(0);
  const [topSearchIndex, setTopSearchIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    getCountCart(mockUserId);
  }, [showToast]);

  const fetchProducts = async () => {
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      const response = await productService.getProducts(params);
      setProducts(response.items);
      setTotalPages(response.metadata.totalPages);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddCart = async (productId, mockUserId) => {
    try {
      const response = await productService.addToCart(productId, mockUserId);
      console.log(response);
      if (response.status === 'success') {
        setToastMessage('Thêm vào giỏ hàng thành công!');
        setToastVariant('success');
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage('Có lỗi xảy ra khi thêm vào giỏ hàng');
      setToastVariant('danger');
      setShowToast(true);
      console.error('Error adding to cart:', error);
    }
  }

  const getCountCart = async (user_id) => {
    try {
      const response = await productService.getCountCart(user_id);
      setCartCount(response);
    } catch (error) {
      console.error('Error getting cart count:', error);
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
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} countCart={cartCount} />

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
          onZoom={handleOpenDetail}
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
          products={products}
          onAddCart={handleAddCart}
          onZoom={handleOpenDetail}
          user_id={mockUserId}
        />

        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>

      <ProductPreview
        showDetail={showDetail}
        handleCloseDetail={handleCloseDetail}
        selectedProduct={selectedProduct}
      />

      <NotificationToast
        show={showToast}
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}

export default ListPage;
