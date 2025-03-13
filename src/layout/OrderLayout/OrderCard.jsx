import { Eye, MessageCircle } from 'lucide-react';
import React from 'react';

const OrderCard = ({ order, activeTab }) => {
	// Hàm hiển thị trạng thái đơn hàng
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
			case 'delivery':
				return <span className='ms-3 text-primary fw-bold'>CHỜ GIAO HÀNG</span>;
			case 'cancelled':
				return <span className='ms-3 text-danger fw-bold'>ĐÃ HỦY</span>;
			case 'refund':
				return <span className='ms-3 text-secondary fw-bold'>TRẢ HÀNG/HOÀN TIỀN</span>;
			default:
				return <span className='ms-3 text-muted fw-bold'>KHÔNG XÁC ĐỊNH</span>;
		}
	};

	// Nếu không có order, hiển thị thông báo
	if (!order) {
		return <p>Không có đơn hàng nào để hiển thị.</p>;
	}

	return (
		<div className='card mb-3 order-card'>
			<div className='card-header bg-white d-flex justify-content-between align-items-center py-2'>
				<div className='d-flex align-items-center'>
					<span className='badge bg-danger text-white me-2'>Yêu thích</span>
					<span className='fw-bold'>
						{order?.OrderDetails?.[0]?.Product?.shop?.shop_name ||
							'Không xác định'}
					</span>
				</div>

				<div className='d-flex align-items-center'>
					<button className='btn btn-sm btn-outline-secondary me-2'>
					<i className='bi bi-chat-left-dots' /> Chat
					</button>
					<button className='btn btn-sm btn-outline-secondary'>
					<i className='bi bi-eye' /> Xem Shop
					</button>
					{getStatusText(order.status || activeTab)}
				</div>
			</div>

			<div className='card-body'>
				{/* Kiểm tra OrderDetails có phải là mảng không trước khi map */}
				{Array.isArray(order?.OrderDetails) && order.OrderDetails.length > 0 ? (
					order.OrderDetails.map((detail, index) => (
						<div key={detail.id || index} className='row mb-3'>
							<div className='col-md-8'>
								<div className='d-flex'>
									<img
										src={
											detail?.Product?.image_url ||
											'https://via.placeholder.com/80'
										}
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
											{detail?.Product?.product_name ||
												'Sản phẩm không xác định'}
										</h6>
										<p className='text-muted mb-1'>
											Phân loại hàng:{' '}
											{detail?.Product?.category?.name || 'Không xác định'}
										</p>
										<p className='mb-0'>x{detail?.quantity || 1}</p>
									</div>
								</div>
							</div>
							<div className='col-md-4 text-end'>
								<p className='price-original mb-0'>
									₫{detail?.Product?.import_price || '0'}
								</p>
								<p className='price-discounted mb-0'>
									₫{detail?.subtotal || order?.total || '0'}
								</p>
							</div>
						</div>
					))
				) : (
					<p>Không có chi tiết đơn hàng.</p>
				)}
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
				<button className='btn btn-danger me-2'>Mua Lại</button>
				<button className='btn btn-outline-secondary me-2'>Đánh Giá</button>
				<button className='btn btn-outline-secondary'>Liên Hệ Người Bán</button>
			</div>
		</div>
	);
};

export default OrderCard;
