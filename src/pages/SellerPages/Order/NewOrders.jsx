import React, { useState, useEffect } from 'react';
import OrderHeader from '../../../components/Seller/Order/OrderHeader';
import OrderTable from '../../../components/Seller/Order/OrderTable';

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const mockOrders = [
    {
      order_id: "1",
      user_id: "1",
      payment_method: "THANH TOÁN KHI NHẬN HÀNG",
      name: "Nguyễn Văn An",
      phone: "0912345678",
      address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
      pincode: "700000",
      total: 855000,
      email: "nguyenvanan@gmail.com",
      status: "pending",
      created_at: "2025-03-15"
    },
    {
      order_id: "2",
      user_id: "2",
      payment_method: "THANH TOÁN KHI NHẬN HÀNG",
      name: "Trần Thị Bình",
      phone: "0987654321",
      address: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
      pincode: "700000",
      total: 2399000,
      email: "tranthibinh@gmail.com",
      status: "pending",
      created_at: "2025-03-15"
    }
  ];

  const mockOrderDetails = [
    {
      id: 1,
      order_id: "1",
      product_id: "1",
      product_name: "Áo thun cổ tròn",
      image: "https://via.placeholder.com/80x80",
      quantity: 1,
      price: 855000,
      subtotal: 855000
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

  const handleStatusChange = (orderId, newStatus) => {

    const updatedOrders = orders.filter(order => order.order_id !== orderId);
    setOrders(updatedOrders);

    if (selectedOrderId === orderId) {
      setSelectedOrderId(null);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(1);

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
        title="Đơn hàng mới"
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
            handleStatusChange={handleStatusChange}
            orderType="new"
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

export default NewOrders;