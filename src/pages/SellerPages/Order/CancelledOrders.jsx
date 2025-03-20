import React, { useState, useEffect } from 'react';
import OrderHeader from '../../../components/Seller/Order/OrderHeader';
import OrderTable from '../../../components/Seller/Order/OrderTable';

const CancelledOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const mockOrders = [
    {
      order_id: "7",
      user_id: "7",
      payment_method: "THANH TOÁN KHI NHẬN HÀNG",
      name: "Trần Văn Khoa",
      phone: "0967890123",
      address: "404 Đường Trần Hưng Đạo, Quận 1, TP.HCM",
      pincode: "700000",
      total: 3699000,
      email: "tranvankhoa@gmail.com",
      status: "cancelled",
      created_at: "2025-03-12"
    },
    {
      order_id: "8",
      user_id: "8",
      payment_method: "THẺ TÍN DỤNG",
      name: "Lê Thị Mai",
      phone: "0978901234",
      address: "505 Đường Hai Bà Trưng, Quận 3, TP.HCM",
      pincode: "700000",
      total: 1499000,
      email: "lethimai@gmail.com",
      status: "cancelled",
      created_at: "2025-03-11"
    }
  ];

  const mockOrderDetails = [
    {
      id: 1,
      order_id: "7",
      product_id: "15",
      product_name: "Đồng hồ thông minh",
      image: "https://via.placeholder.com/80x80",
      quantity: 1,
      price: 3699000,
      subtotal: 3699000
    }
  ];

  useEffect(() => {
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const toggleOrderDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);

    if (orderId && !orderDetails[orderId]) {
      setOrderDetails(prevDetails => ({
        ...prevDetails,
        [orderId]: mockOrderDetails
      }));
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();

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
      <OrderHeader
        title="Đơn hàng đã hủy"
        subtitle="Quản lý thông tin liên quan đến đơn hàng. Chỉ có quyền Quản lý mới có thể truy cập tính năng này."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      <div className="card">
        <div className="card-body">
          <OrderTable
            orders={orders}
            loading={loading}
            error={error}
            selectedOrderId={selectedOrderId}
            toggleOrderDetails={toggleOrderDetails}
            handleStatusChange={() => { }}  // Không thay đổi trạng thái với đơn hàng đã hủy
            orderType="cancelled"
            orderDetails={orderDetails}
          />

          {/* Phân trang đơn giản */}
          {/* {!loading && !error && orders.length > 0 && (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CancelledOrders;