import React, { useState, useEffect } from 'react';
import OrderHeader from '../../../components/Seller/Order/OrderHeader';
import DeliveryTable from '../../../components/Seller/Order/DeliveryTable';
import { shopService } from '../../../services/shopService';
import { useSeller } from '../../../hooks/contexts/SellerContext';

const OrdersInDelivery = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const {shops} = useSeller();

  const fetchOrders = async () => {
    try {
      const data = await shopService.getDeliveryOrders(shops); 
      setOrders(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);

    const order = orders.find(order => order.order_id === orderId);
    setOrderDetails({ [orderId]: order.OrderDetails });
  };

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

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await shopService.updateStatus(orderId, status);
      if (response) {
        fetchOrders(); 
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <OrderHeader
        title="Đơn hàng đang giao"
        subtitle="Quản lý thông tin liên quan đến các đơn hàng mà shipper đang giao."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      <div className="card">
        <div className="card-body">
          <DeliveryTable
            orders={orders}
            loading={loading}
            error={error}
            selectedOrderId={selectedOrderId}
            toggleOrderDetails={toggleOrderDetails}
            orderDetails={orderDetails}
            handleStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersInDelivery;
