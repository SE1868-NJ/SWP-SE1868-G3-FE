import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth, useAuthActions } from '../hooks/contexts/AuthContext';
import MiniCartModal from '../components/Modals/MiniCartModal';

function Header() {
	const { cartCount, user, isAuthenticated } = useAuth();
	const { logoutAndRedirect } = useAuthActions();
	const [userData, setUserData] = useState(user);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	// Cập nhật userData khi user thay đổi
	useEffect(() => {
		setUserData(user);
	}, [user]);

	// Hàm xử lý đăng xuất
	const handleLogout = (e) => {
		e.preventDefault();
		logoutAndRedirect('/login');
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/search?query=${searchQuery.trim()}`);
		}
	};

	// Kiểm tra xem người dùng đã là người bán chưa
	const isSeller = user && user.role === 'seller';

	return (
		<div className='shadow-sm'>
			<nav className='bg-danger'>
				<div className='container d-flex py-2 flex-wrap border-bottom border-light'>
					<ul className='nav me-auto'>
						<li className='nav-item'>
							<Link
								to='/seller'
								className='nav-link link-body-emphasis px-2 ps-0 active text-light'
								aria-current='page'
							>
								Kênh người bán
							</Link>
						</li>
						<li className='nav-link px-0 text-light'>|</li>

						{!isAuthenticated && (
							<li className='nav-item'>
								<Link
									to='/login'
									className='nav-link link-body-emphasis px-2 text-light'
								>
									Trở thành người bán
								</Link>
							</li>
						)}
					</ul>
					<ul className='nav'>
						{isAuthenticated ? (
							// Hiển thị khi đã đăng nhập
							<li className='nav-item dropdown'>
								<a
									className='nav-link dropdown-toggle link-body-emphasis px-2 text-light'
									role='button'
									data-bs-toggle='dropdown'
								>
									{user?.name || 'Tài khoản'}
								</a>
								<ul className='dropdown-menu dropdown-menu-end border-0 shadow-sm bg-body-tertiary'>
									<li>
										<Link to='/purchase' className='dropdown-item'>
											Đơn mua
										</Link>
									</li>
									<li><hr className='dropdown-divider m-0 p-0' /></li>
									<li>
										<Link to='/profile' className='dropdown-item'>
											Tài khoản của tôi
										</Link>
									</li>
									<li><hr className='dropdown-divider m-0 p-0' /></li>
									<li>
										<a onClick={handleLogout} className='dropdown-item' href="#">
											Đăng xuất
										</a>
									</li>
								</ul>
							</li>
						) : (
							// Hiển thị khi chưa đăng nhập
							<>
								<li className='nav-item'>
									<Link
										to='/login'
										className='nav-link link-body-emphasis px-2 text-light'
									>
										Đăng nhập
									</Link>
								</li>
								<li className='nav-link px-0 text-light'>|</li>
								<li className='nav-item'>
									<Link
										to='/signup'
										className='nav-link link-body-emphasis px-2 pe-0 text-light'
									>
										Đăng ký
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav >
			<header className='py-3 border-bottom bg-danger'>
				<div className='container d-flex flex-wrap justify-content-center'>
					<Link
						to='/'
						className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none text-light'
					>
						<i
							className='bi bi-bag-heart-fill me-2'
							style={{ fontSize: '1.5rem' }}
						/>
						<span className='fs-4 fw-bold'>Chợ Làng</span>
					</Link>
					<form
						className='col-12 col-lg-auto mb-3 mb-lg-0'
						role='search'
						onSubmit={handleSearch}
					>
						<div className='hstack gap-2'>
							<div className='input-group'>
								<input
									type='search'
									className='form-control border-0'
									style={{ boxShadow: 'none' }}
									placeholder='Tìm kiếm...'
									aria-label='Search'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<button type='submit' className='btn bg-white border-0'>
									<i className='bi bi-search' />
								</button>
							</div>

							<MiniCartModal />
						</div>
					</form>
				</div>
			</header>
		</div >
	);
}

export default Header;