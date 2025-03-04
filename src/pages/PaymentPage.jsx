import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const PaymentPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(24 * 60 * 60); // 24 giờ tính bằng giây

  // Thông tin tài khoản ngân hàng (trong thực tế nên lấy từ API)
  const bankAccounts = [
    {
      bank: "Vietcombank",
      accountNumber: "1234567890",
      accountName: "CONG TY TNHH SHOP ME GAU",
      branch: "Hà Nội"
    },
    {
      bank: "BIDV",
      accountNumber: "0987654321",
      accountName: "CONG TY TNHH SHOP ME GAU",
      branch: "Hà Nội"
    }
  ];

  // Lấy thông tin đơn hàng
  useEffect(() => {
    const fetchOrder = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await axios.get(`${API_URL}/orders/${orderId}`, {
    //       headers: {
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`
    //       }
    //     });
    //     setOrder(response.data.data);
    //   } catch (err) {
    //     console.error("Failed to fetch order:", err);
    //     setError("Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.");
    //   } finally {
    //     setLoading(false);
    //   }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  // Đếm ngược thời gian thanh toán
  useEffect(() => {
    // if (!order) return;

    // const timer = setInterval(() => {
    //   setCountdown(prevCountdown => {
    //     if (prevCountdown <= 1) {
    //       clearInterval(timer);
    //       return 0;
    //     }
    //     return prevCountdown - 1;
    //   });
    // }, 1000);

    // return () => clearInterval(timer);
  }, [order]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  // Format thời gian đếm ngược
  const formatCountdown = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => alert("Đã sao chép: " + text),
      (err) => alert("Không thể sao chép: " + err)
    );
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3">Đang tải thông tin thanh toán...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/orders" className="btn btn-primary mt-3">Quay lại đơn hàng của tôi</Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning" role="alert">
          Không tìm thấy thông tin đơn hàng
        </div>
        <Link to="/orders" className="btn btn-primary mt-3">Quay lại đơn hàng của tôi</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Thông tin thanh toán</h4>
            </div>
            
            <div className="card-body">
              <div className="alert alert-warning">
                <div className="d-flex align-items-center">
                  <div>
                    <i className="bi bi-clock me-2"></i>
                    Vui lòng hoàn tất thanh toán trong:
                  </div>
                  <div className="ms-2 fw-bold">{formatCountdown(countdown)}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <h5>Thông tin đơn hàng #{order.orderCode}</h5>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Tổng tiền:</td>
                      <td className="fw-bold text-danger">{formatCurrency(order.totalAmount)}</td>
                    </tr>
                    <tr>
                      <td>Nội dung chuyển khoản:</td>
                      <td>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value={`Thanh toan ${order.orderCode}`}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => copyToClipboard(`Thanh toan ${order.orderCode}`)}
                          >
                            <i className="bi bi-clipboard"></i>
                          </button>
                        </div>
                        <small className="text-muted">
                          Vui lòng sử dụng nội dung chuyển khoản chính xác để được xác nhận tự động
                        </small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mb-4">
                <h5>Chuyển khoản đến một trong các tài khoản sau:</h5>
                <div className="row">
                  {bankAccounts.map((account, index) => (
                    <div className="col-md-6 mb-3" key={index}>
                      <div className="card h-100">
                        <div className="card-body">
                          <h6 className="card-title">{account.bank}</h6>
                          <p className="card-text mb-1">
                            <strong>Số TK:</strong> 
                            <span 
                              className="ms-2 cursor-pointer text-primary"
                              style={{ cursor: 'pointer' }}
                              onClick={() => copyToClipboard(account.accountNumber)}
                            >
                              {account.accountNumber} <i className="bi bi-clipboard"></i>
                            </span>
                          </p>
                          <p className="card-text mb-1"><strong>Chủ TK:</strong> {account.accountName}</p>
                          <p className="card-text mb-0"><strong>Chi nhánh:</strong> {account.branch}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="alert alert-info">
                <h6 className="alert-heading">Hướng dẫn thanh toán:</h6>
                <ol className="mb-0">
                  <li>Chuyển khoản đến một trong các tài khoản trên</li>
                  <li>Sử dụng <strong>chính xác</strong> nội dung chuyển khoản</li>
                  <li>Đơn hàng sẽ được xác nhận tự động sau khi thanh toán</li>
                  <li>Thời gian xác nhận: 5-15 phút sau khi chuyển khoản</li>
                </ol>
              </div>
              
              <div className="text-center mt-4">
                <Link to={`/order-confirmation/${orderId}`} className="btn btn-success me-3">
                  Tôi đã thanh toán
                </Link>
                <Link to={`/orders/${orderId}`} className="btn btn-outline-secondary">
                  Xem chi tiết đơn hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;