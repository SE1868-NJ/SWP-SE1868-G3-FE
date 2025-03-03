import React, { useState } from 'react';
import {
	Bell,
	User,
	FileText,
	Gift,
	Coins,
	MessageCircle,
	Eye,
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function OrderCanceled() {
	const [activeTab, setActiveTab] = useState('all');

	return (
		<div className='container-fluid p-0'>
			<div className='row g-0'>
				{/* Sidebar */}
				<div className='col-md-3 col-lg-2 ' style={{ minHeight: '100vh' }}>
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
							<div className='fw-bold'>pthuan8324</div>
							<small className='text-muted'>Sửa Hồ Sơ</small>
						</div>
					</div>

					<div className='py-2'>
						<div className='sidebar-item'>
							<Bell className='sidebar-icon' size={20} />
							<span>Thông Báo</span>
						</div>
						<div className='sidebar-item active'>
							<User className='sidebar-icon' size={20} />
							<span>Tài Khoản Của Tôi</span>
						</div>
						<div className='sidebar-item'>
							<FileText className='sidebar-icon' size={20} />
							<span className='text-danger'>Đơn Mua</span>
						</div>
						<div className='sidebar-item'>
							<Gift className='sidebar-icon' size={20} />
							<span>Kho Voucher</span>
						</div>
						<div className='sidebar-item'>
							<Coins className='sidebar-icon' size={20} />
							<span>Shopee Xu</span>
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
						{/* Order Item 1 */}
						<div className='card mb-3 order-card'>
							<div className='card-header bg-white d-flex justify-content-between align-items-center py-2'>
								<div className='d-flex align-items-center'>
									<span className='badge badge-favorite me-2'>Yêu thích</span>
									<span className='fw-bold'>TỦ GHÉP-LƯỚI SẮT-CHUỒNG...</span>
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
									<span className='ms-3 text-danger fw-bold'>ĐÃ HỦY</span>
								</div>
							</div>
							<div className='card-body'>
								<div className='row'>
									<div className='col-md-8'>
										<div className='d-flex'>
											<img
												src='https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80'
												alt='Product'
												className='product-image me-3'
											/>
											<div>
												<h6 className='mb-1'>
													(FREESHIP) BỘ COMBO CHUỒNG MÈO ,CHUỒNG CHÓ ,CHUỒNG
													QUẦY ĐỨƠI 6KG LẮP GHÉP SƠN TĨNH ĐIỆN CHO PET
												</h6>
												<p className='text-muted mb-1'>Phân loại hàng: Đen</p>
												<p className='mb-0'>x1</p>
											</div>
										</div>
									</div>
									<div className='col-md-4 text-end'>
										<p className='price-original mb-0'>₫260.000</p>
										<p className='price-discounted mb-0'>₫153.000</p>
									</div>
								</div>
							</div>
							<div className='card-footer bg-white d-flex justify-content-between align-items-center py-3'>
								<div>
									<small className='text-muted'>
										Đã hủy tự động bởi hệ thống Shopee
									</small>
									<i className='ms-2 text-muted bi bi-info-circle'></i>
								</div>
								<div className='d-flex align-items-center'>
									<span className='me-3'>Thành tiền:</span>
									<span className='total-price'>₫153.000</span>
								</div>
							</div>
							<div className='card-footer bg-white border-top-0 text-end py-2'>
								<button className='btn btn-danger me-2'>Mua Lại</button>
								<button className='btn btn-outline-secondary me-2'>
									Xem Thông Tin Hoàn Tiền
								</button>
								<button className='btn btn-outline-secondary'>
									Liên Hệ Người Bán
								</button>
							</div>
						</div>

						{/* Order Item 2 (Duplicate of the first one for demonstration) */}
						<div className='card mb-3 order-card'>
							<div className='card-header bg-white d-flex justify-content-between align-items-center py-2'>
								<div className='d-flex align-items-center'>
									<span className='badge badge-favorite me-2'>Yêu thích</span>
									<span className='fw-bold'>TỦ GHÉP-LƯỚI SẮT-CHUỒNG...</span>
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
									<span className='ms-3 text-danger fw-bold'>ĐÃ HỦY</span>
								</div>
							</div>
							<div className='card-body'>
								<div className='row'>
									<div className='col-md-8'>
										<div className='d-flex'>
											<img
												src='https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80'
												alt='Product'
												className='product-image me-3'
											/>
											<div>
												<h6 className='mb-1'>
													(FREESHIP) BỘ COMBO CHUỒNG MÈO ,CHUỒNG CHÓ ,CHUỒNG
													QUẦY ĐỨƠI 6KG LẮP GHÉP SƠN TĨNH ĐIỆN CHO PET
												</h6>
												<p className='text-muted mb-1'>Phân loại hàng: Đen</p>
												<p className='mb-0'>x1</p>
											</div>
										</div>
									</div>
									<div className='col-md-4 text-end'>
										<p className='price-original mb-0'>₫260.000</p>
										<p className='price-discounted mb-0'>₫153.000</p>
									</div>
								</div>
							</div>
							<div className='card-footer bg-white d-flex justify-content-between align-items-center py-3'>
								<div>
									<small className='text-muted'>
										Đã hủy tự động bởi hệ thống Shopee
									</small>
									<i className='ms-2 text-muted bi bi-info-circle'></i>
								</div>
								<div className='d-flex align-items-center'>
									<span className='me-3'>Thành tiền:</span>
									<span className='total-price'>₫153.000</span>
								</div>
							</div>
							<div className='card-footer bg-white border-top-0 text-end py-2'>
								<button className='btn btn-danger me-2'>Mua Lại</button>
								<button className='btn btn-outline-secondary me-2'>
									Xem Thông Tin Hoàn Tiền
								</button>
								<button className='btn btn-outline-secondary'>
									Liên Hệ Người Bán
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderCanceled;
