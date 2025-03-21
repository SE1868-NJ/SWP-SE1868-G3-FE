import { Link, useLocation } from 'react-router-dom';
import { useSeller } from '../../hooks/contexts/SellerContext';

function Sidebar() {
	const { shops } = useSeller();
	const location = useLocation();

	// Check current path to highlight active items
	const isActive = (path) => {
		return location.pathname.includes(path);
	};

	// Kiểm tra chính xác đường dẫn cho Dashboard
	const isDashboardActive = location.pathname === '/seller' || location.pathname === '/seller/';

	return (
		<div
			className='bg-body-tertiary min-vh-100 border-1 border-end d-flex flex-column'
			style={{
				width: '17rem',
				position: 'fixed',
				top: 0,
				left: 0,
				bottom: 0,
				height: '100vh',
				overflowY: 'auto',
				zIndex: 1030,
				boxShadow: '0 0 10px rgba(0,0,0,0.1)'
			}}
			id='sidebar'
		>
			<div className='navbar bg-danger navbar-expand border-bottom border-1'>
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

			{/* Phần nội dung sidebar */}
			<div className='p-3 flex-grow-1'>
				<div className='accordion w-100' id='accordionExample'>
					{/* Dashboard */}
					<div className='accordion-item'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<Link
								to='/seller'
								className={`d-flex align-items-center text-decoration-none p-3 text-dark ${isDashboardActive ? 'fw-bold' : ''
									}`}
								style={{
									cursor: 'pointer',
									borderRadius: '5px',
									backgroundColor: isDashboardActive ? '#e6f2ff' : ''
								}}
							>
								<i className='bi bi-speedometer2 h6 m-0 p-0 me-3' />
								<h6 className='fw-bold m-0 p-0'>Dashboard</h6>
							</Link>
						</h2>
					</div>

					{/* Gian hàng */}
					<div className='accordion-item'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className={`accordion-button collapsed ${isActive('/seller/shop') ? 'fw-bold' : ''}`}
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#profile'
								aria-expanded='false'
								aria-controls='profile'
								style={{
									backgroundColor: isActive('/seller/shop') ? '#e6f2ff' : ''
								}}
							>
								<i className='bi bi-shop h6 m-0 p-0 me-3' />
								<h6 className='fw-bold m-0 p-0'>Gian hàng</h6>
							</button>
						</h2>
						<div
							id='profile'
							className='accordion-collapse collapse'
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item px-0'>
										<Link to={'/seller/message'} className='nav-link'>
											Thông tin gian hàng
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/ratting'} className='nav-link'>
											Cập nhật gian hàng
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/ratting'} className='nav-link'>
											Xoá gian hàng
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Quản lý */}
					<div className='accordion-item'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className={`accordion-button collapsed ${isActive('/seller/products') || isActive('/seller/suppliers') || isActive('/seller/vouchers') ? 'fw-bold' : ''}`}
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#manage'
								aria-expanded='false'
								aria-controls='manage'
								style={{
									backgroundColor: isActive('/seller/products') || isActive('/seller/suppliers') || isActive('/seller/vouchers') ? '#e6f2ff' : ''
								}}
							>
								<i className='bi bi-kanban h6 m-0 p-0 me-3' />
								<h6 className='fw-bold m-0 p-0'>Quản lý</h6>
							</button>
						</h2>
						<div
							id='manage'
							className='accordion-collapse collapse'
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item px-0'>
										<Link to={'/seller/products'} className={`nav-link ${isActive('/seller/products') ? 'fw-bold' : ''}`}>
											Sản phẩm
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/suppliers'} className={`nav-link ${isActive('/seller/suppliers') ? 'fw-bold' : ''}`}>
											Nhà cung cấp
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/vouchers'} className={`nav-link ${isActive('/seller/vouchers') ? 'fw-bold' : ''}`}>
											Khuyến mại
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Đơn hàng */}
					<div className='accordion-item'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className={`accordion-button collapsed ${isActive('/seller/orders') ? 'fw-bold' : ''}`}
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#orders'
								aria-expanded='false'
								aria-controls='orders'
								style={{
									backgroundColor: isActive('/seller/orders') ? '#e6f2ff' : ''
								}}
							>
								<i className='bi bi-box-seam h6 m-0 p-0 me-3' />
								<h6 className='fw-bold m-0 p-0'>Đơn hàng</h6>
							</button>
						</h2>
						<div
							id='orders'
							className='accordion-collapse collapse'
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item px-0'>
										<Link to={'/seller/orders/new'} className={`nav-link ${isActive('/seller/orders/new') ? 'fw-bold' : ''}`}>
											Đơn hàng mới
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/orders/processing'} className={`nav-link ${isActive('/seller/orders/processing') ? 'fw-bold' : ''}`}>
											Đơn hàng đang xử lý
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/orders/completed'} className={`nav-link ${isActive('/seller/orders/completed') ? 'fw-bold' : ''}`}>
											Đơn hàng đã hoàn thành
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/orders/cancelled'} className={`nav-link ${isActive('/seller/orders/cancelled') ? 'fw-bold' : ''}`}>
											Đơn hàng đã hủy
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Chăm sóc khách hàng */}
					<div className='accordion-item'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className={`accordion-button collapsed ${isActive('/seller/chat') || isActive('/seller/ratings') ? 'fw-bold' : ''}`}
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#social'
								aria-expanded='false'
								aria-controls='social'
								style={{
									backgroundColor: isActive('/seller/chat') || isActive('/seller/ratings') ? '#e6f2ff' : ''
								}}
							>
								<i className='bi bi-share h6 m-0 p-0 me-3' />
								<h6 className='fw-bold m-0 p-0'>Chăm sóc khách hàng</h6>
							</button>
						</h2>
						<div
							id='social'
							className='accordion-collapse collapse'
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item px-0'>
										<Link to={'/seller/chat'} className={`nav-link ${isActive('/seller/chat') ? 'fw-bold' : ''}`}>
											Tin nhắn
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/ratings'} className={`nav-link ${isActive('/seller/ratings') ? 'fw-bold' : ''}`}>
											Quản lý đánh giá
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Shop */}
			<div className='mt-auto'>
				<div className='navbar bg-body-tertiary navbar-expand border-1 border-top'>
					<div className='container-fluid'>
						<div className='input-group'>
							<i className='bi bi-shop input-group-text bg-danger text-light p-3'></i>
							<select
								name='shopID'
								id='shop-id'
								className='form-select form-select-lg dropup shadow-none'
							>
								{shops.map((shop) => (
									<option key={shop.shop_id} value={shop.shop_id}>
										{shop.shop_name}
									</option>
								))}
							</select>
							<Link
								to={'/seller/shop/create'}
								className='btn btn-danger btn-lg'
								data-bs-toggle='tooltip'
								data-bs-placement='top'
								title='Tạo gian hàng mới'
							>
								<i className='bi bi-plus-circle' />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;