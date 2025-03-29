import { Link } from 'react-router-dom';

function Header({ toggleSidebar, isSidebarInitiallyVisible }) {

	return (
        <nav className='navbar navbar-expand bg-body-tertiary border-bottom shadow-sm'>
			<div className='container-fluid'>
				<div className='d-flex align-items-center'>
					{/* <Link
						to='/'
						id='brand-logo-header'
						className='text-danger fw-bold text-decoration-none me-3 d-none d-lg-inline-block'
						style={{
							fontSize: '1.25rem',
							display: window.innerWidth >= 992 && isSidebarInitiallyVisible ? 'none' : 'inline-block'
						}}
					>
					</Link> */}

					<button
						type='button'
						className='btn btn-outline-secondary me-3 d-flex align-items-center justify-content-center p-0' 
						onClick={toggleSidebar} 
						aria-label="Toggle sidebar" 
						style={{
							width: '40px',
							height: '40px',
							boxShadow: 'none',
							borderRadius: '4px'
						}}
					>
						<i className='bi bi-list fs-4'></i>
					</button>

					<div className='navbar-brand mb-0 fw-medium'>Kênh Người Bán</div>
				</div>

				<div className='d-inline-flex'>
					<Link to={'/profile'} className='btn btn-outline-danger d-flex align-items-center'> 
                        <i className="bi bi-person-circle me-1"></i>
						<span>Trang cá nhân</span>
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Header;