import 'bootstrap/dist/css/bootstrap.min.css';
import { Eye, MessageCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';

function CompletedOrder() {
	const [activeTab, setActiveTab] = useState('completed');
	const [order, setOrder] = useState(null);
	const userId = '4';

	useEffect(() => {
		const fetchCompletedOrders = async () => {
			try {
				const data = await orderService.getCompletedOrders(userId);
				console.log('Completed orders from API:', data);
				setOrder(data);
			} catch (error) {
				console.error('Error fetching completed orders:', error.message);
				setOrder(null);
			}
		};
		fetchCompletedOrders();
	}, [userId]);

	return (
		<div className='container-fluid p-0'>
			<div className='row g-0'>
				{/* Sidebar */}
				<div className='col-md-3 col-lg-2' style={{ minHeight: '100vh' }}>
					<div className='d-flex align-items-center p-3 border-bottom'>
						<div
							className='rounded-circle bg-light me-2'
							style={{ width: 40, height: 40, overflow: 'hidden' }}
						>
							<img
								src='https://via.placeholder.com/40'
								alt='Profile'
								className='w-100 h-100'
							/>
						</div>
						<div>
							<div className='fw-bold'>Lê Văn C</div>
							<small className='text-muted'>Sửa Hồ Sơ</small>
						</div>
					</div>
					<div className='py-2'>
						<div className='sidebar-item'>
							<i class='bi bi-bell fs-5'></i>
							<span>Thông Báo</span>
						</div>
						<div className='sidebar-item'>
							<i class='bi bi-person fs-5'></i>
							<span>Tài Khoản Của Tôi</span>
						</div>
						<div className='sidebar-item'>
							<i class='bi bi-file-earmark-text fs-5'></i>
							<span className='text-danger'>Đơn Mua</span>
						</div>
						<div className='sidebar-item'>
							<i class='bi bi-gift fs-5'></i>
							<span>Kho Voucher</span>
						</div>
						<div className='sidebar-item'>
							<i class='bi bi-coin fs-5'></i>
							<span>Shop Xu</span>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='col-md-9 col-lg-10 bg-light'>
					{/* Order Tabs */}
					<div className='bg-white mb-3'>
						<ul className='nav nav-tabs border-0 container nav-justified'>
							<li className='nav-item'>
								<button
									className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
									onClick={() => setActiveTab('all')}
								>
									Tất cả
								</button>
							</li>
							<li className='nav-item'>
								<button
									className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
									onClick={() => setActiveTab('pending')}
								>
									Chờ thanh toán
								</button>
							</li>
							<li className='nav-item'>
								<button
									className={`nav-link ${activeTab === 'shipping' ? 'active' : ''}`}
									onClick={() => setActiveTab('shipping')}
								>
									Vận chuyển
								</button>
							</li>
							<li className='nav-item'>
								<button
									className={`nav-link ${activeTab === 'delivery' ? 'active' : ''}`}
									onClick={() => setActiveTab('delivery')}
								>
									Chờ giao hàng
								</button>
							</li>
							<li className='nav-item'>
								<button
									className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
									onClick={() => setActiveTab('completed')}
								>
									Hoàn thành
								</button>
							</li>
							<li className='nav-item'>
								<button
									className={`nav-link ${activeTab === 'cancelled' ? 'active' : ''}`}
									onClick={() => setActiveTab('cancelled')}
								>
									Đã hủy
								</button>
							</li>
							<li className='nav-item'>
								<button
									className={`nav-link ${activeTab === 'refund' ? 'active' : ''}`}
									onClick={() => setActiveTab('refund')}
								>
									Trả hàng/Hoàn tiền
								</button>
							</li>
						</ul>
					</div>

					{/* Order Items */}
					<div className='container'>
						{activeTab === 'completed' && order ? (
							<div className='card mb-3 order-card'>
								<div className='card-header bg-white d-flex justify-content-between align-items-center py-2'>
									<div className='d-flex align-items-center'>
										<span className='badge badge-favorite me-2'>Yêu thích</span>
										<span className='fw-bold'>
											{order?.OrderDetails?.[0]?.Product?.shop?.shop_name ||
												'Không xác định'}
										</span>
									</div>
									<div className='d-flex align-items-center'>
										<button className='btn btn-sm btn-outline-secondary me-2'>
											<MessageCircle size={16} className='me-1' />
											Chat
										</button>
										<button className='btn btn-sm btn-outline-secondary'>
											<Eye size={16} className='me-1' />
											Xem Shop
										</button>
										<span className='ms-3 text-success fw-bold'>
											HOÀN THÀNH
										</span>
									</div>
								</div>
								<div className='card-body'>
									<div className='row'>
										<div className='col-md-8'>
											<div className='d-flex'>
												<img
													src={
														order?.OrderDetails?.[0]?.Product?.image_url ||
														'https://via.placeholder.com/80'
													}
													alt='Product'
													className='product-image me-3'
												/>
												<div>
													<h6 className='mb-1'>
														{order?.OrderDetails?.[0]?.Product?.product_name ||
															'Sản phẩm không xác định'}
													</h6>
													<p className='text-muted mb-1'>
														Phân loại hàng:{' '}
														{order?.OrderDetails?.[0]?.Product?.category
															?.name || 'Không xác định'}
													</p>
													<p className='mb-0'>
														x{order?.OrderDetails?.[0]?.quantity || 1}
													</p>
												</div>
											</div>
										</div>
										<div className='col-md-4 text-end'>
											<p className='price-original mb-0'>
												₫
												{order?.OrderDetails?.[0]?.Product?.import_price || '0'}
											</p>
											<p className='price-discounted mb-0'>
												₫
												{order?.OrderDetails?.[0]?.subtotal ||
													order?.total ||
													'0'}
											</p>
										</div>
									</div>
								</div>
								<div className='card-footer bg-white d-flex justify-content-between align-items-center py-3'>
									<small className='text-muted'>
										{order?.note || 'Đơn hàng đã được giao thành công'}
									</small>
									<div className='d-flex align-items-center'>
										<span className='me-3'>Thành tiền:</span>
										<span className='total-price'>₫{order?.total || '0'}</span>
									</div>
								</div>
							</div>
						) : (
							<p>Không có đơn hàng nào đã hoàn thành.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CompletedOrder;
