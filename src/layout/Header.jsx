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
	const [forceUpdate, setForceUpdate] = useState(Date.now());

	useEffect(() => {
		setUserData(user);
	}, [user]);

	// Add event listener for user data changes
	useEffect(() => {
		const handleUserDataChanged = () => {
			try {
				const storedUserData = JSON.parse(localStorage.getItem('userData'));
				if (storedUserData) {
					setUserData(prev => ({
						...prev,
						...storedUserData
					}));
					setForceUpdate(Date.now());
				}
			} catch (error) {
				console.error('Error parsing userData from localStorage', error);
			}
		};

		window.addEventListener('userDataChanged', handleUserDataChanged);
		window.addEventListener('load', handleUserDataChanged);

		return () => {
			window.removeEventListener('userDataChanged', handleUserDataChanged);
			window.removeEventListener('load', handleUserDataChanged);
		};
	}, []);

	const handleLogout = (e) => {
		e.preventDefault();
		logoutAndRedirect('/login');
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	// Get user display name from userData or user
	const getUserDisplayName = () => {
		if (userData && userData.full_name) {
			return userData.full_name;
		} else if (user && user.name) {
			return user.name;
		} else if (user && user.full_name) {
			return user.full_name;
		}
		return 'Tài khoản';
	};

	return (
		<div className='shadow'>
			<nav className='bg-danger'>
				<div className='container d-flex py-2 flex-wrap border-bottom border-light'>
					<ul className='nav me-auto'>
						<li className='nav-item'>
							<Link
								to='/seller'
								className='nav-link link-body-emphasis px-2 ps-0 text-light hover-opacity'
								aria-current='page'
							>
								<i className="bi bi-shop me-1"></i> Kênh người bán
							</Link>
						</li>
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
									<i className="bi bi-person-circle me-1"></i> {getUserDisplayName()}
								</a>
								<ul className='dropdown-menu dropdown-menu-end border-0 shadow-sm bg-body-tertiary rounded-3'>
									<li>
										<Link to='/orders/all' className='dropdown-item'>
											<i className="bi bi-bag me-2"></i> Đơn mua
										</Link>
									</li>
									<li><hr className='dropdown-divider m-0 p-0' /></li>
									<li>
										<Link to='/profile' className='dropdown-item'>
											<i className="bi bi-person me-2"></i> Tài khoản của tôi
										</Link>
									</li>
									<li><hr className='dropdown-divider m-0 p-0' /></li>
									<li>
										<a onClick={handleLogout} className='dropdown-item text-danger' href="#">
											<i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
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
										<i className="bi bi-box-arrow-in-right me-1"></i> Đăng nhập
									</Link>
								</li>
								<li className='nav-link px-0 text-light'>|</li>
								<li className='nav-item'>
									<Link
										to='/signup'
										className='nav-link link-body-emphasis px-2 pe-0 text-light'
									>
										<i className="bi bi-person-plus me-1"></i> Đăng ký
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav>
			<header className='py-3 border-bottom bg-danger'>
				<div className='container d-flex flex-wrap justify-content-between align-items-center'>
					<Link
						to='/'
						className='d-flex align-items-center mb-md-0 me-md-auto text-decoration-none text-light'
					>
						<i
							className='bi bi-bag-heart-fill me-2'
							style={{ fontSize: '1.8rem' }}
						/>
						<span className='fs-3 fw-bold'>Chợ Làng</span>
					</Link>
					<form
						className='col-12 col-md-6 col-lg-7 mb-2 mb-md-0 mt-3 mt-md-0'
						role='search'
						onSubmit={handleSearch}
					>
						<div className='d-flex align-items-center'>
							<div className='input-group'>
								<input
									type='search'
									className='form-control py-2 border-0 shadow-none'
									style={{ fontSize: '1.1rem' }}
									placeholder='Tìm kiếm sản phẩm...'
									aria-label='Search'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<button type='submit' className='btn bg-white border-0 px-3'>
									<i className='bi bi-search fs-5' />
								</button>
							</div>

							<div className="ms-3">
								<MiniCartModal />
							</div>
						</div>
					</form>
				</div>
			</header>
		</div>
	);
}

// Add custom CSS for hover effects
const styleTag = document.createElement('style');
styleTag.textContent = `
  .hover-opacity:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }
  
  /* Add smooth transition for dropdown */
  .dropdown-menu {
    transition: all 0.2s ease;
  }
`;
document.head.appendChild(styleTag);

export default Header;