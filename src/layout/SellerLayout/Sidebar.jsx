import { Link, useLocation } from 'react-router-dom';
import { useSeller } from '../../hooks/contexts/SellerContext';

function Sidebar({ isVisible, sidebarClass }) {
	const { shops } = useSeller();
	const location = useLocation();

	const isActive = (path) => {
		const currentPath = location.pathname;
		if (path === '/seller') {
			return currentPath === '/seller' || currentPath === '/seller/';
		}
		return currentPath.startsWith(path);
	};

	const isShopActive =
		isActive('/seller/shop-info') || isActive('/seller/ratting');
	const isManageActive =
		isActive('/seller/products') ||
		isActive('/seller/suppliers') ||
		isActive('/seller/vouchers');
	const isOrderActive = isActive('/seller/orders');
	const isCustomerCareActive =
		isActive('/seller/chat') || isActive('/seller/ratings');

	return (
		<div
			className={`bg-body-tertiary min-vh-100 border-end d-flex flex-column sidebar-fixed ${sidebarClass}`}
			style={{
				width: '17rem',

				position: window.innerWidth >= 992 ? 'fixed' : 'fixed',
				left:
					window.innerWidth >= 992 ? (isVisible ? '0' : '-17rem') : '-17rem',
				transform:
					window.innerWidth < 992
						? isVisible
							? 'translateX(0)'
							: 'translateX(-100%)'
						: 'none',
				top: 0,
				bottom: 0,
				overflowY: 'auto',
				zIndex: 1030,
				boxShadow: '0 0 10px rgba(0,0,0,0.1)',
			}}
			id='sidebar'
		>
			<div className='navbar bg-danger navbar-expand border-bottom'>
				<div className='container-fluid px-3'>
					<div className='navbar-brand w-100 me-0 text-center'>
						<Link
							to='/'
							className='link-body-emphasis text-white fw-bold text-decoration-none'
							style={{ fontSize: '1.25rem' }}
						>
							<i
								className='bi bi-bag-heart-fill me-2'
								style={{ fontSize: '1.25rem' }}
							/>
							Chợ Làng
						</Link>
					</div>
				</div>
			</div>

			<div className='p-3 flex-grow-1'>
				<div className='accordion w-100' id='accordionSidebar'>
					<div className='accordion-item border-0 mb-1'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<Link
								to='/seller'
								className={`d-flex align-items-center text-decoration-none p-3 text-dark rounded ${isActive('/seller') ? 'fw-bold bg-light-subtle' : ''}`} // Dùng class tiện hơn style inline
								style={{ borderRadius: '5px' }}
							>
								<i className='bi bi-speedometer2 fs-5 m-0 p-0 me-3' />
								<span className='fw-medium m-0 p-0'>Dashboard</span>
							</Link>
						</h2>
					</div>

					<div className='accordion-item border-0 mb-1'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className={`accordion-button collapsed p-3 rounded ${isShopActive ? 'fw-bold' : ''}`}
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#collapseShop'
								aria-expanded={isShopActive ? 'true' : 'false'}
								aria-controls='collapseShop'
								style={{
									backgroundColor: isShopActive ? '#e6f2ff' : 'transparent',
								}}
							>
								<i className='bi bi-shop fs-5 m-0 p-0 me-3' />
								<span className='fw-medium m-0 p-0'>Gian hàng</span>
							</button>
						</h2>
						<div
							id='collapseShop' // Đổi ID
							className={`accordion-collapse collapse ${isShopActive ? 'show' : ''}`} // Thêm show nếu active
							data-bs-parent='#accordionSidebar' // Đổi parent ID
						>
							<div className='accordion-body py-0 ps-5'>
								{' '}
								{/* Điều chỉnh padding */}
								<ul className='list-group list-group-flush'>
									<li className='list-group-item px-0 py-2'>
										{' '}
										{/* Điều chỉnh padding */}
										<Link
											to={'/seller/shop-info'}
											className={`nav-link ${isActive('/seller/shop-info') ? 'fw-bold text-primary' : ''}`}
										>
											Thông tin gian hàng
										</Link>
									</li>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/ratting'}
											className={`nav-link ${isActive('/seller/ratting') ? 'fw-bold text-primary' : ''}`}
										>
											Trang trí gian hàng
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Quản lý */}
					<div className='accordion-item border-0 mb-1'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className={`accordion-button collapsed p-3 rounded ${isManageActive ? 'fw-bold' : ''}`}
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#collapseManage' // Đổi ID
								aria-expanded={isManageActive ? 'true' : 'false'}
								aria-controls='collapseManage'
								style={{
									backgroundColor: isManageActive ? '#e6f2ff' : 'transparent',
								}}
							>
								<i className='bi bi-kanban fs-5 m-0 p-0 me-3' />
								<span className='fw-medium m-0 p-0'>Quản lý</span>
							</button>
						</h2>
						<div
							id='collapseManage'
							className={`accordion-collapse collapse ${isManageActive ? 'show' : ''}`}
							data-bs-parent='#accordionSidebar'
						>
							<div className='accordion-body py-0 ps-5'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/products'}
											className={`nav-link ${isActive('/seller/products') ? 'fw-bold text-primary' : ''}`}
										>
											Sản phẩm
										</Link>
									</li>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/suppliers'}
											className={`nav-link ${isActive('/seller/suppliers') ? 'fw-bold text-primary' : ''}`}
										>
											Nhà cung cấp
										</Link>
									</li>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/vouchers'}
											className={`nav-link ${isActive('/seller/vouchers') ? 'fw-bold text-primary' : ''}`}
										>
											Khuyến mại
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className='accordion-item border-0 mb-1'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className={`accordion-button collapsed p-3 rounded ${isOrderActive ? 'fw-bold' : ''}`}
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#collapseOrders'
								aria-expanded={isOrderActive ? 'true' : 'false'}
								aria-controls='collapseOrders'
								style={{
									backgroundColor: isOrderActive ? '#e6f2ff' : 'transparent',
								}}
							>
								<i className='bi bi-box-seam fs-5 m-0 p-0 me-3' />
								<span className='fw-medium m-0 p-0'>Đơn hàng</span>
							</button>
						</h2>
						<div
							id='collapseOrders'
							className={`accordion-collapse collapse ${isOrderActive ? 'show' : ''}`}
							data-bs-parent='#accordionSidebar'
						>
							<div className='accordion-body py-0 ps-5'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/orders/new'}
											className={`nav-link ${isActive('/seller/orders/new') ? 'fw-bold text-primary' : ''}`}
										>
											Đơn hàng mới
										</Link>
									</li>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/orders/processing'}
											className={`nav-link ${isActive('/seller/orders/processing') ? 'fw-bold text-primary' : ''}`}
										>
											Đang xử lý
										</Link>
									</li>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/orders/ship'}
											className={`nav-link ${isActive('/seller/orders/ship') ? 'fw-bold text-primary' : ''}`}
										>
											Đang giao
										</Link>
									</li>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/orders/completed'}
											className={`nav-link ${isActive('/seller/orders/completed') ? 'fw-bold text-primary' : ''}`}
										>
											Hoàn thành
										</Link>
									</li>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/orders/cancelled'}
											className={`nav-link ${isActive('/seller/orders/cancelled') ? 'fw-bold text-primary' : ''}`}
										>
											Đã hủy
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className='accordion-item border-0 mb-1'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className={`accordion-button collapsed p-3 rounded ${isCustomerCareActive ? 'fw-bold' : ''}`}
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#collapseCustomerCare'
								aria-expanded={isCustomerCareActive ? 'true' : 'false'}
								aria-controls='collapseCustomerCare'
								style={{
									backgroundColor: isCustomerCareActive
										? '#e6f2ff'
										: 'transparent',
								}}
							>
								<i className='bi bi-chat-dots fs-5 m-0 p-0 me-3' />
								<span className='fw-medium m-0 p-0'>Chăm sóc KH</span>
							</button>
						</h2>
						<div
							id='collapseCustomerCare'
							className={`accordion-collapse collapse ${isCustomerCareActive ? 'show' : ''}`}
							data-bs-parent='#accordionSidebar'
						>
							<div className='accordion-body py-0 ps-5'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/chat'}
											className={`nav-link ${isActive('/seller/chat') ? 'fw-bold text-primary' : ''}`}
										>
											Tin nhắn
										</Link>
									</li>
									<li className='list-group-item px-0 py-2'>
										<Link
											to={'/seller/ratting/:shop_id'}
											className={`nav-link ${isActive('/seller/ratting/:shop_id') ? 'fw-bold text-primary' : ''}`}
										>
											Quản lý đánh giá
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-auto border-top p-3'>
				<div className='input-group'>
					<span className='input-group-text bg-danger text-light'>
						<i className='bi bi-shop'></i>
					</span>
					<select
						name='shopID'
						id='shop-id'
						className='form-select shadow-none'
						aria-label='Chọn gian hàng'
					>
						{shops && shops.length > 0 ? (
							shops.map((shop) => (
								<option key={shop.shop_id} value={shop.shop_id}>
									{shop.shop_name}
								</option>
							))
						) : (
							<option value=''>Chưa có gian hàng</option>
						)}
					</select>
					<Link
						to={'/seller/shop/create'}
						className='btn btn-danger'
						data-bs-toggle='tooltip'
						data-bs-placement='top'
						title='Tạo gian hàng mới'
						aria-label='Tạo gian hàng mới'
					>
						<i className='bi bi-plus-circle' />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
