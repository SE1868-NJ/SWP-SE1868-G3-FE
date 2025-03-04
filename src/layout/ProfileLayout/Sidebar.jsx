import { Link } from 'react-router-dom';
import { authContext } from '../../hooks/contexts/AuthContext';

function Sidebar() {
	const { userData } = authContext();

	return (
		<div
			className='offcanvas-md offcanvas-start bg-body-tertiary min-vh-100 border-1 border-end d-flex flex-column'
			style={{ width: '22rem' }}
			tabIndex='-1'
			id='sidebar'
		>
			{/* Header */}
			{/* <div className='navbar bg-danger navbar-expand border-bottom border-1'>
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
			</div> */}

			{/* User Profile Header */}
			<div className='offcanvas-header border-bottom'>
				<div className='d-flex align-items-center w-100'>
					<div
						className='rounded-circle bg-light me-2'
						style={{ width: 40, height: 40, overflow: 'hidden' }}
					>
						<img
							src={userData.avatar || 'https://via.placeholder.com/40'}
							alt='Avatar'
							className='w-100 h-100'
							style={{ objectFit: 'cover' }}
						/>
					</div>
					<div>
						<div className='fw-bold'>{userData.full_name || 'Tên User'}</div>
						<small className='text-muted'>Sửa Hồ Sơ</small>
					</div>
				</div>
				<button
					type='button'
					className='btn-close'
					data-bs-dismiss='offcanvas'
					data-bs-target='#sidebar'
				></button>
			</div>

			{/* Sidebar Content */}
			<div className='offcanvas-body m-0 p-3'>
				<div className='accordion w-100' id='accordionExample'>
					{/* Tài Khoản Của Tôi */}
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
								<i
									className='bi bi-person text-primary me-3'
									style={{ fontSize: 20 }}
								/>
								<h6 className='fw-bold m-0 p-0'>Tài Khoản Của Tôi</h6>
							</button>
						</h2>
						<div
							id='profile'
							className='accordion-collapse collapse show'
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body'>
								<ul className='list-group list-group-flush'>
									<li className='list-group-item px-0'>Hồ sơ</li>
									<li className='list-group-item px-0'>Ngân hàng</li>
									<li className='list-group-item px-0'>Địa chỉ</li>
									<li className='list-group-item px-0'>Đổi mật khẩu</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Đơn Mua với Link */}
					<div className='accordion-item'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<Link
								to='/order_canceled'
								className='accordion-button text-decoration-none'
								style={{
									background: 'none',
									border: 'none',
									padding: '1rem 1.25rem',
								}}
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#orders'
								aria-expanded='true'
								aria-controls='orders'
							>
								<i
									className='bi bi-card-list text-info me-3'
									style={{ fontSize: 20 }}
								/>
								<h6 className='fw-bold m-0 p-0 text-danger'>Đơn Mua</h6>
							</Link>
						</h2>
						<div
							id='orders'
							className='accordion-collapse collapse'
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body'>
								{/* Có thể thêm nội dung chi tiết về đơn mua ở đây */}
							</div>
						</div>
					</div>

					{/* Kho Voucher */}
					<div className='accordion-item'>
						<h2 className='accordion-header' style={{ boxShadow: 'none' }}>
							<button
								className='accordion-button'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#vouchers'
								aria-expanded='true'
								aria-controls='vouchers'
							>
								<i
									className='bi bi-ticket-perforated text-danger me-3'
									style={{ fontSize: 20 }}
								/>
								<h6 className='fw-bold m-0 p-0'>Kho Voucher</h6>
							</button>
						</h2>
						<div
							id='vouchers'
							className='accordion-collapse collapse'
							data-bs-parent='#accordionExample'
						>
							<div className='accordion-body'>
								{/* Có thể thêm nội dung chi tiết về voucher ở đây */}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer (Shop selection) */}
			{/* <div className='mt-auto'>
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
			</div> */}
		</div>
	);
}

export default Sidebar;
