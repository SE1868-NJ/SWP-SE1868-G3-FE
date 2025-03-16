import React, { useState, useEffect } from 'react';
import OrderHeader from '../../../components/Seller/Order/OrderHeader';
import OrderTable from '../../../components/Seller/Order/OrderTable';
// Không cần import OrderDetails riêng vì nó đã được import trong OrderTable

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dữ liệu mẫu cho quá trình phát triển
  const mockOrders = [
    {
      order_id: "5",
      user_id: "5",
      payment_method: "PAYPAL",
      name: "Hoàng Văn Đạt",
      phone: "0945678901",
      address: "202 Đường Cách Mạng Tháng 8, Quận 3, TP.HCM",
      pincode: "700000",
      total: 4200000,
      email: "hoangvandat@gmail.com",
      status: "completed",
      created_at: "2025-03-10"
    },
    {
      order_id: "6",
      user_id: "6",
      payment_method: "THẺ TÍN DỤNG",
      name: "Nguyễn Thị Hoa",
      phone: "0956789012",
      address: "303 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
      pincode: "700000",
      total: 1875000,
      email: "nguyenthihoa@gmail.com",
      status: "completed",
      created_at: "2025-03-09"
    }
  ];

  // Chi tiết đơn hàng mẫu
  const mockOrderDetails = [
    {
      id: 1,
      order_id: "5",
      product_id: "10",
      product_name: "Loa bluetooth không dây",
      image: "https://via.placeholder.com/80x80",
      quantity: 2,
      price: 2100000,
      subtotal: 4200000
    }
  ];

  // Tải dữ liệu mẫu khi component mount
  useEffect(() => {
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  // Hiển thị/ẩn chi tiết đơn hàng
  const toggleOrderDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);

    // Tải chi tiết đơn hàng nếu chưa được tải
    if (orderId && !orderDetails[orderId]) {
      setOrderDetails(prevDetails => ({
        ...prevDetails,
        [orderId]: mockOrderDetails
      }));
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    if (e) e.preventDefault();

    // Lọc đơn giản cho demo
    if (searchTerm.trim() === '') {
      setOrders(mockOrders);
    } else {
      const filtered = mockOrders.filter(order =>
        order.order_id.includes(searchTerm) ||
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setOrders(filtered);
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Header với tiêu đề và tìm kiếm */}
      <OrderHeader
        title="Đơn hàng đã hoàn thành"
        subtitle="Quản lý thông tin liên quan đến đơn hàng. Chỉ có quyền Quản lý mới có thể truy cập tính năng này."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      {/* Bảng đơn hàng với chi tiết tích hợp */}
      <div className="card">
        <div className="card-body">
          <OrderTable
            orders={orders}
            loading={loading}
            error={error}
            selectedOrderId={selectedOrderId}
            toggleOrderDetails={toggleOrderDetails}
            handleStatusChange={() => { }}  // Không thay đổi trạng thái với đơn hàng đã hoàn thành
            orderType="completed"
            orderDetails={orderDetails}
          />

          {/* Phân trang đơn giản */}
          {!loading && !error && orders.length > 0 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <button className="page-link">
                    <i className="bi bi-chevron-left"></i>
                  </button>
                </li>
                <li className="page-item active">
                  <button className="page-link">1</button>
                </li>
                <li className="page-item disabled">
                  <button className="page-link">
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedOrders;