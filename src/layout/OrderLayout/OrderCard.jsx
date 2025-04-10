import { Eye, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewModal from '../../components/Modals/ReviewModal';

const OrderCard = ({ order, activeTab }) => {
  const [reviewProduct, setReviewProduct] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Hàm xử lý hiển thị và ẩn modal
  const handleOpenReviewModal = (product, productId) => {
    setReviewProduct({...product, id: productId});
    setShowReviewModal(true);
  };
  
  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setReviewProduct(null);
  };
  
  const handleSubmitReview = (reviewData) => {
    // Gửi đánh giá đến API
    // ...
  };

  // Hàm nhóm sản phẩm theo shop
  const groupProductsByShop = (orderDetails) => {
    if (!Array.isArray(orderDetails)) return {};
    return orderDetails.reduce((acc, detail) => {
      const shopId = detail.Product?.shop?.shop_id;
      if (shopId) {
        if (!acc[shopId]) acc[shopId] = { shopName: detail.Product.shop.shop_name, products: [] };
        acc[shopId].products.push(detail);
      }
      return acc;
    }, {});
  };

  // Sử dụng orderDetails hoặc OrderDetails tùy theo cấu trúc dữ liệu
  const orderDetailsArray = order?.orderDetails || order?.OrderDetails || [];
  const productGroups = groupProductsByShop(orderDetailsArray);

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <span className='ms-3 text-success fw-bold'>HOÀN THÀNH</span>;
      case 'pending':
        return (
          <span className='ms-3 text-warning fw-bold'>CHỜ THANH TOÁN</span>
        );
      case 'shipping':
        return <span className='ms-3 text-info fw-bold'>ĐANG VẬN CHUYỂN</span>;
      case 'processing':
        return <span className='ms-3 text-primary fw-bold'>ĐANG XỬ LÝ</span>;
      case 'cancelled':
        return <span className='ms-3 text-danger fw-bold'>ĐÃ HỦY</span>;
      case 'refund':
        return (
          <span className='ms-3 text-secondary fw-bold'>
            TRẢ HÀNG/HOÀN TIỀN
          </span>
        );
      default:
        return <span className='ms-3 text-muted fw-bold'>KHÔNG XÁC ĐỊNH</span>;
    }
  };

  // Nếu không có order, hiển thị thông báo
  if (!order) {
    return <p>Không có đơn hàng nào để hiển thị.</p>;
  }

  // Nút hành động chung cho đơn hàng
  const renderOrderActionButtons = () => {
    switch (order?.status?.toLowerCase()) {
      case 'completed':
        return (
          <>
            <button className='btn btn-danger me-2'>Mua Lại</button>
            <button className='btn btn-outline-secondary me-2'>
              Liên Hệ Người Bán
            </button>
          </>
        );
      case 'shipping':
        return (
          <button className='btn btn-outline-secondary'>
            Liên Hệ Người Bán
          </button>
        );
      case 'cancelled':
        return (
          <>
            <button className='btn btn-danger me-2'>Mua Lại</button>
            <button className='btn btn-warning me-2'>
              Xem Chi Tiết Đơn Hủy
            </button>
            <button className='btn btn-outline-secondary'>
              Liên Hệ Người Bán
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {Object.keys(productGroups).length > 0 ? (
        Object.keys(productGroups).map((shopId) => {
          const shop = productGroups[shopId];
          return (
            <div key={shopId} className='card mb-3 order-card'>
              <div className='card-header bg-white d-flex justify-content-between align-items-center py-2'>
                <div className='d-flex align-items-center'>
                  <span className='badge bg-danger text-white me-2'>Yêu thích</span>
                  <span className='fw-bold'>{shop.shopName || 'Không xác định'}</span>
                </div>

                <div className='d-flex align-items-center'>
                  <button className='btn btn-sm btn-outline-secondary me-2'>
                    <MessageCircle size={16} className='me-1' />
                    Chat
                  </button>
                  <Link
                    to={`/shop/${shopId}/homepage`}
                    className='btn btn-sm btn-outline-secondary'
                  >
                    <Eye size={16} className='me-1' />
                    Xem Shop
                  </Link>
                  {getStatusText(order.status || activeTab)}
                </div>
              </div>

              <div className='card-body'>
                {shop.products.map((detail) => {
                  const productId = detail.product_id || detail.Product?.id;
                  return (
                    <div key={detail.id} className='row mb-3 align-items-center'>
                      <div className='col-md-8'>
                        <div className='d-flex'>
                          <img
                            src={detail?.Product?.image_url || 'https://via.placeholder.com/80'}
                            alt='Product'
                            className='product-image me-3'
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                            }}
                          />
                          <div>
                            <h6 className='mb-1'>
                              {detail?.Product?.product_name || 'Sản phẩm không xác định'}
                            </h6>
                            <p className='text-muted mb-1'>
                              Phân loại hàng: {detail?.Product?.category?.name || 'Không xác định'}
                            </p>
                            <p className='mb-0'>x{detail?.quantity || 1}</p>
                            
                            {/* Hiển thị nút đánh giá cho từng sản phẩm nếu đơn hàng đã hoàn thành */}
                            {order?.status?.toLowerCase() === 'completed' && (
                              <button 
                                className='btn btn-sm btn-outline-primary mt-2'
                                onClick={() => handleOpenReviewModal(detail.Product, productId)}
                              >
                                Đánh Giá
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='col-md-4 text-end'>
                        <p className='price-original mb-0'>
                          ₫{detail?.Product?.import_price || '0'}
                        </p>
                        <p className='price-discounted mb-0'>
                          ₫{detail?.subtotal || '0'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className='card-footer bg-white d-flex justify-content-between align-items-center py-3'>
                <div>
                  <small className='text-muted'>
                    {order?.note || 'Đơn hàng đã được giao thành công'}
                  </small>
                  <i className='ms-2 text-muted bi bi-info-circle'></i>
                </div>
                <div className='d-flex align-items-center'>
                  <span className='me-3'>Thành tiền:</span>
                  <span className='total-price'>₫{order?.total || '0'}</span>
                </div>
              </div>

              <div className='card-footer bg-white border-top-0 text-end py-2'>
                {renderOrderActionButtons()}
              </div>
            </div>
          );
        })
      ) : (
        <div className='card mb-3 order-card'>
          <div className='card-body'>
            <p>Không có chi tiết đơn hàng.</p>
          </div>
        </div>
      )}
      
      <ReviewModal
        show={showReviewModal}
        handleClose={handleCloseReviewModal}
        onHide={() => setShowReviewModal(false)}
        onSubmitReview={handleSubmitReview}
        product={reviewProduct}
      />
    </>
  );
};

export default OrderCard;