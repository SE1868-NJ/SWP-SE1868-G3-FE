import { Link } from 'react-router-dom';
import { useSeller } from '../../hooks/contexts/SellerContext';

function Sidebar() {
	const { shops } = useSeller();

	return (
		<div
			className='offcanvas-md offcanvas-start bg-body-tertiary min-vh-100 border-1 border-end d-flex flex-column'
			style={{ width: '22rem' }}
			tabIndex='-1'
			id='sidebar'
		>
			<div className='navbar bg-danger navbar-expand border-bottom border-1'>
				<div className='container-fluid px-3'>
					<div className='navbar-brand w-100 me-0'>
						<Link
							to='/'
							className='text-white fw-bold text-decoration-none d-inline-flex w-100 justify-content-between'
						>
							<i className='bi bi-bag-heart-fill'></i>
							<span>Chợ Làng</span>
							<i className='bi bi-bag-heart-fill'></i>
						</Link>
					</div>
				</div>
			</div>
			<div className='offcanvas-header border-bottom fw-bold text-danger'>
				<h5 className='offcanvas-title'>Quản lý gian hàng</h5>
				<button
					type='button'
					className='btn-close'
					data-bs-dismiss='offcanvas'
					data-bs-target='#sidebar'
				></button>
			</div>
			<div className='offcanvas-body m-0 p-3'>
				<div className='accordion w-100' id='accordionExample'>
					{/* Profile */}
					<div className='accordion-item'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className='accordion-button'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#profile'
								aria-expanded='true'
								aria-controls='profile'
							>
								<i className='bi bi-shop h6 m-0 p-0 me-3' />
								<h6 className=' fw-bold m-0 p-0'>Gian hàng</h6>
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
					{/* Profile */}

					{/* Manage */}
					<div className='accordion-item'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className='accordion-button'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#manage'
								aria-expanded='true'
								aria-controls='manage'
							>
								<i className='bi bi-kanban h6 m-0 p-0 me-3' />
								<h6 className=' fw-bold m-0 p-0'>Quản lý</h6>
							</button>
						</h2>
						<div
							id='manage'
							className='accordion-collapse collapse show'
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item px-0'>
										<Link to={'/seller/products'} className='nav-link'>
											Sản phẩm
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/suppliers'} className='nav-link'>
											Nhà cung cấp
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/orders'} className='nav-link'>
											Đơn hàng
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/orders'} className='nav-link'>
											Khuyến mại
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/* Manage */}

					{/* Social */}
					<div className='accordion-item'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className='accordion-button'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#social'
								aria-expanded='true'
								aria-controls='social'
							>
								<i className='bi bi-share h6 m-0 p-0 me-3' />
								<h6 className=' fw-bold m-0 p-0'>Giao Tiếp</h6>
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
										<Link to={'/seller/chat'} className='nav-link'>
											Tin nhắn
										</Link>
									</li>
									<li className='list-group-item px-0'>
										<Link to={'/seller/ratting'} className='nav-link'>
											Đánh giá
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/* Social */}
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
			{/* Shop */}
		</div>
	);
}

export default Sidebar;
