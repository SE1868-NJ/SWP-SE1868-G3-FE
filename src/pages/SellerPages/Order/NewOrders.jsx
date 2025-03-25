import React, { useState, useEffect } from 'react';
import OrderHeader from '../../../components/Seller/Order/OrderHeader';
import OrderTable from '../../../components/Seller/Order/OrderTable';
import { Socket } from '../../../services/socket';
import { shopService } from '../../../services/shopService';

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Socket.emit('join-checkout', 1);

    Socket.on('new_order', (newOrder) => {
      setOrders(prevOrders => [...prevOrders, newOrder]);
      
      toast.success('Đã có đơn hàng mới!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });

    return () => {
      Socket.off('new_order');
    };
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await shopService.getNewOrderByShop(1);
        // console.log(data);
        setOrders(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
      setSelectedOrderId(orderId);

      const order = orders.find(order => order.order_id === orderId);
      console.log(order, 'order');
      setOrderDetails({ [orderId]: order.OrderDetails });
  };
  
  const handleSearch = (e) => {
    if (e) e.preventDefault();

    if (searchTerm.trim() === '') {
      setOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.order_id.includes(searchTerm) ||
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setOrders(filtered);
    }
  };

  const handleStatusChange = (orderId, status) => {

  }

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
            orderDetails={orderDetails}
            handleStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NewOrders;
