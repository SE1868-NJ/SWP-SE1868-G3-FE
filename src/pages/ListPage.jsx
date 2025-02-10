import React, { useState } from "react";
import foodImage from "../assets/images/Food.jpg";
import Card from "../components/Card";
import Container from "../components/Container";
import { Col, Row } from "../components/Grid";

const productsData = [
  {
    id: 1,
    name: "Bún chả Hà Nội",
    price: 30000,
    category: "Đồ ăn",
    img: foodImage,
  },
  {
    id: 2,
    name: "Nước ép cam nguyên chất",
    price: 15000,
    category: "Đồ uống",
    img: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Bánh mì chay",
    price: 20000,
    category: "Đồ ăn chay",
    img: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Thịt lợn",
    price: 150000,
    category: "Đồ tươi sống",
    img: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Bún bò Huế",
    price: 35000,
    category: "Đồ ăn",
    img: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Coca Cola",
    price: 10000,
    category: "Đồ uống",
    img: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "Chả giò chay",
    price: 40000,
    category: "Đồ ăn chay",
    img: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    name: "Cá thu",
    price: 120000,
    category: "Đồ tươi sống",
    img: "https://via.placeholder.com/150",
  },
];

const categories = ["Tất cả", "Đồ ăn", "Đồ ăn chay", "Đồ uống", "Đồ tươi sống"];
const priceRanges = [
  "Tất cả",
  "Dưới 50k",
  "50k - 100k",
  "100k - 200k",
  "Trên 200k",
];

function ListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Thêm state cho thanh tìm kiếm

  const itemsPerPage = 4;

  // Lọc sản phẩm theo danh mục
  const filteredProducts = productsData.filter(
    (product) =>
      (selectedCategory === "Tất cả" ||
        product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) // 🔍 Lọc theo tên sản phẩm
  );

  // Lọc sản phẩm theo giá
  const sortedProducts = filteredProducts.filter((product) => {
    if (selectedPriceRange === "Tất cả") return true;
    if (selectedPriceRange === "Dưới 50k") return product.price < 50000;
    if (selectedPriceRange === "50k - 100k")
      return product.price >= 50000 && product.price < 100000;
    if (selectedPriceRange === "100k - 200k")
      return product.price >= 100000 && product.price < 200000;
    if (selectedPriceRange === "Trên 200k") return product.price >= 200000;
  });

  // Tính toán sản phẩm hiển thị trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <h2 className="text-danger fw-bold text-center">🛍️ Sản phẩm nổi bật</h2>

      {/* 🔍 Thanh tìm kiếm */}
      <div className="mb-3 text-center">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="🔍 Nhập tên sản phẩm..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
          }}
        />
      </div>

      {/* Bộ lọc danh mục */}
      <div className="mb-4 text-center">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn mx-2 ${
              selectedCategory === category
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset trang khi thay đổi danh mục
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Bộ lọc giá */}
      <div className="mb-4 text-center">
        {priceRanges.map((priceRange) => (
          <button
            key={priceRange}
            className={`btn mx-2 ${
              selectedPriceRange === priceRange
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => {
              setSelectedPriceRange(priceRange);
              setCurrentPage(1); // Reset trang khi thay đổi giá
            }}
          >
            {priceRange}
          </button>
        ))}
      </div>

      {/* Hiển thị sản phẩm */}
      <Row>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Col key={product.id} md={3}>
              <Card className="shadow-sm mb-4">
                <img
                  src={product.img}
                  alt={product.name}
                  className="card-img-top"
                />
                <Card.Body>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    Giá: {product.price.toLocaleString()} VNĐ
                  </p>
                  <button className="btn btn-success w-100">Mua ngay</button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">
            ❌ Không tìm thấy sản phẩm nào!
          </p>
        )}
      </Row>

      {/* Phân trang */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({
            length: Math.ceil(sortedProducts.length / itemsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}

export default ListPage;
