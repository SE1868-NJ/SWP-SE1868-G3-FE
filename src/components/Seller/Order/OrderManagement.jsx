import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Status mapping for different order views
const STATUS_TYPES = {
  new: 'pending',
  processing: 'processing',
  completed: 'completed',
  cancelled: 'cancelled'
};


const OrderManagement = () => {
  const { status = 'new' } = useParams(); // Default to 'new' orders if no param
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch orders based on status
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // In real app, this would be a proper API endpoint with filtering
        const response = await axios.get(`/api/orders`, {
          params: {
            status: STATUS_TYPES[status],
            page: currentPage,
            search: searchTerm
          }
        });

        // Check if response.data exists and contains orders
        if (response.data && response.data.orders) {
          setOrders(response.data.orders);
          setTotalPages(response.data.totalPages || 1);
        } else {
          // If API doesn't return expected structure, use empty array
          setOrders([]);
          setTotalPages(1);
          console.warn('API response missing expected data structure');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again later.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    // For development - use mock data instead of API call
    // Comment this out when API is ready
    setOrders(mockOrders);
    setLoading(false);

    // Uncomment this when API is ready
    // fetchOrders();
  }, [status, currentPage, searchTerm]);

  // Fetch order details when an order is selected
  useEffect(() => {
    const fetchOrderDetails = async (orderId) => {
      try {
        const response = await axios.get(`/api/orders/${orderId}/details`);
        if (response.data) {
          setOrderDetails(prevDetails => ({
            ...prevDetails,
            [orderId]: response.data
          }));
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (selectedOrderId && !orderDetails[selectedOrderId]) {
      // For development - use mock details instead of API call
      setOrderDetails(prevDetails => ({
        ...prevDetails,
        [selectedOrderId]: mockOrderDetails
      }));

      // Uncomment this when API is ready
      // fetchOrderDetails(selectedOrderId);
    }
  }, [selectedOrderId, orderDetails]);

  // Toggle order details visibility
  const toggleOrderDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Comment out actual API call during development
      /*
      await axios.patch(`/api/orders/${orderId}`, {
        status: newStatus
      });
      */

      // For development/demo purposes
      console.log(`Order ${orderId} status changed to ${newStatus}`);

      // Remove the order from the current view
      const updatedOrders = orders.filter(order => order.order_id !== orderId);
      setOrders(updatedOrders);

      // Close details if open
      if (selectedOrderId === orderId) {
        setSelectedOrderId(null);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  // Navigation between status tabs
  const changeStatusView = (newStatus) => {
    navigate(`/seller/orders/${newStatus}`);
    setCurrentPage(1);
  };

  // Mock data for demo (remove in production)
  const mockOrders = [
    {
      order_id: "1",
      user_id: "1",
      payment_method: "CASH ON DELIVERY",
      name: "Shailender Gautam",
      phone: "919324428098",
      address: "318B Tilak Hanuman mandir MAHARASHTRA India",
      pincode: "401101",
      total: 855,
      email: "wwwshailender274@gmail.com",
      status: "pending",
      created_at: "2025-03-15"
    },
    {
      order_id: "2",
      user_id: "2",
      payment_method: "CASH ON DELIVERY",
      name: "Ssebiru Imaad",
      phone: "256700752014",
      address: "kampala kampala hhh Wakuleana Uganda",
      pincode: "00526",
      total: 2399,
      email: "ssebiruimaad@gmail.com",
      status: "pending",
      created_at: "2025-03-15"
    }
  ];

  // Mock order details
  const mockOrderDetails = [
    {
      id: 1,
      order_id: "1",
      product_id: "1",
      product_name: "Ok",
      image: "https://via.placeholder.com/80x80",
      quantity: 1,
      price: 855.00,
      subtotal: 855.00
    }
  ];

  return (
    <div className="container-fluid p-4">

      {/* Search bar */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>

      {/* Orders table */}
      <div className="card">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-5 text-danger">
              <p>{error}</p>
            </div>
          ) : orders && orders.length === 0 ? (
            <div className="text-center py-5">
              <p className="h5 text-muted">Không có đơn hàng nào</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th></th>
                    <th>ORDER ID</th>
                    <th>PAYMENT METHOD</th>
                    <th>NAME</th>
                    <th>PHONE NUMBER</th>
                    <th>ADDRESS</th>
                    <th>TOTAL AMOUNT</th>
                    <th>EMAIL</th>
                    <th>USER ID</th>
                    <th>ORDER STATUS</th>
                    <th>DATE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over orders safely with optional chaining */}
                  {orders && orders.map((order) => (
                    <React.Fragment key={order.order_id}>
                      <tr>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-secondary rounded-circle"
                            onClick={() => toggleOrderDetails(order.order_id)}
                          >
                            <i className={`bi ${selectedOrderId === order.order_id ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                          </button>
                        </td>
                        <td>{order.order_id}</td>
                        <td>{order.payment_method}</td>
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td className="text-truncate" style={{ maxWidth: '150px' }}>{order.address}</td>
                        <td>{order.total}</td>
                        <td>{order.email}</td>
                        <td>{order.user_id}</td>
                        <td>
                          <span className={`badge ${order.status === 'pending' ? 'bg-warning' :
                            order.status === 'processing' ? 'bg-primary' :
                              order.status === 'completed' ? 'bg-success' :
                                'bg-danger'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{order.created_at}</td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                              <span>Confirm</span>
                            </button>
                            <ul className="dropdown-menu">
                              {status === 'new' && (
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleStatusChange(order.order_id, 'processing')}
                                  >
                                    Xử lý đơn hàng
                                  </button>
                                </li>
                              )}
                              {status === 'processing' && (
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleStatusChange(order.order_id, 'completed')}
                                  >
                                    Hoàn thành đơn hàng
                                  </button>
                                </li>
                              )}
                              {(status === 'new' || status === 'processing') && (
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleStatusChange(order.order_id, 'cancelled')}
                                  >
                                    Hủy đơn hàng
                                  </button>
                                </li>
                              )}
                            </ul>
                          </div>
                          <button className="btn btn-sm btn-danger ms-2">
                            <span>DELETE</span>
                          </button>
                        </td>
                      </tr>

                      {/* Order details row (expanded when selected) */}
                      {selectedOrderId === order.order_id && (
                        <tr>
                          <td colSpan="13" className="p-0">
                            <div className="bg-light p-3">
                              <h6 className="mb-3">Chi tiết đơn hàng</h6>
                              <table className="table table-sm">
                                <thead>
                                  <tr>
                                    <th>PRODUCT ID</th>
                                    <th>PRODUCT NAME</th>
                                    <th>IMAGE</th>
                                    <th>QUANTITY</th>
                                    <th>PRICE</th>
                                    <th>SUB TOTAL</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* Safely access order details */}
                                  {orderDetails[order.order_id] ?
                                    orderDetails[order.order_id].map(detail => (
                                      <tr key={detail.id}>
                                        <td>{detail.product_id}</td>
                                        <td>{detail.product_name}</td>
                                        <td>
                                          <img src={detail.image || "https://via.placeholder.com/80x80"}
                                            alt="Product"
                                            width="80"
                                            height="80"
                                            className="img-thumbnail" />
                                        </td>
                                        <td>{detail.quantity}</td>
                                        <td>₹{detail.price}</td>
                                        <td>₹{detail.subtotal}</td>
                                      </tr>
                                    )) : (
                                      <tr>
                                        <td colSpan="6" className="text-center">
                                          <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div>
                                          Đang tải chi tiết đơn hàng...
                                        </td>
                                      </tr>
                                    )
                                  }
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && orders && orders.length > 0 && totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(1)}
                  >
                    <i className="bi bi-chevron-double-left"></i>
                  </button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                </li>

                {/* Generate page numbers */}
                {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = idx + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = idx + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + idx;
                  } else {
                    pageNumber = currentPage - 2 + idx;
                  }

                  return (
                    <li
                      key={pageNumber}
                      className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    <i className="bi bi-chevron-double-right"></i>
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

export default OrderManagement;