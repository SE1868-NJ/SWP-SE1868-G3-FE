import React, { useState, useEffect } from 'react';
import OrderHeader from '../../../components/Seller/Order/OrderHeader';
import OrderTable from '../../../components/Seller/Order/OrderTable';
import { shopService } from '../../../services/shopService';
import { useSeller } from '../../../hooks/contexts/SellerContext';

const ProcessingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const {shops} = useSeller();

  const fetchOrders = async () => {
    try {
      const data = await shopService.getProcessingOrderByShop(shops[0].shop_id);
      setOrders(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);

    const order = orders.find(order => order.order_id === orderId);
    setOrderDetails({ [orderId]: order.OrderDetails });
  };

  const handleStatusChange = async (orderId, status) => {
    const response = await shopService.updateStatus(orderId, status);
    if (response) {
      fetchOrders();
    }
  }

  const handleSearch = (e) => {
    if (e) e.preventDefault();

    if (searchTerm.trim() === '') {
      setOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.order_id == (searchTerm)
      );
      setOrders(filtered);
    }
  };

  return (
    <div className="container-fluid p-4">
      <OrderHeader
        title="Đơn hàng đang xử lý"
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
            orderType="processing"
            orderDetails={orderDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingOrders;