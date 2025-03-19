import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
	const [isSidebarVisible, setIsSidebarVisible] = useState(true);

	useEffect(() => {
		const sidebar = document.getElementById('sidebar');
		if (sidebar) {
			setIsSidebarVisible(sidebar.style.left !== '-17rem');
		}
	}, []);

	const toggleSidebar = () => {
		const sidebar = document.getElementById('sidebar');
		const mainContent = document.querySelector('.content-wrapper');
		const brandLogo = document.getElementById('brand-logo-header');

		if (sidebar && mainContent) {
			if (isSidebarVisible) {
				sidebar.style.left = '-17rem';
				mainContent.style.marginLeft = '0';
				mainContent.style.width = '100%';

				if (brandLogo) {
					brandLogo.style.display = 'block';
				}
			} else {
				sidebar.style.left = '0px';
				mainContent.style.marginLeft = '17rem';
				mainContent.style.width = 'calc(100% - 17rem)';

				if (brandLogo) {
					brandLogo.style.display = 'none';
				}
			}

			setIsSidebarVisible(!isSidebarVisible);
		}
	};

	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary border-bottom border-1'
			style={{
				width: '100%',
				position: 'sticky',
				top: 0,
				zIndex: 1020,
				boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
			}}>
			<div className='container-fluid'>
				<div className='d-flex align-items-center'>
					<Link
						to='/'
						id='brand-logo-header'
						className='text-danger fw-bold text-decoration-none me-3'
						style={{
							display: 'none',
							fontSize: '1.25rem'
						}}
					>
						Chợ Làng
					</Link>

					<button
						type='button'
						className='btn btn-outline-secondary me-3 d-flex align-items-center justify-content-center'
						onClick={toggleSidebar}
						style={{
							width: '40px',
							height: '40px',
							boxShadow: 'none',
							borderRadius: '4px'
						}}
					>
						<i className='bi bi-list fs-4'></i>
					</button>

					<div className='navbar-brand mb-0'>Kênh Người Bán</div>
				</div>

				<div className='d-inline-flex'>
					<Link to={'/profile'} className='btn btn-danger'>
						Trang cá nhân
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Header;