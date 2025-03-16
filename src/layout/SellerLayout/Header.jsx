import { Link } from 'react-router-dom';

function Header() {
	return (
		<nav className='navbar bg-body-tertiary border-bottom border-1'
			style={{
				width: '100%',
				position: 'sticky',  // Sử dụng sticky thay vì fixed
				top: 0,
				zIndex: 1020,
				boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
			}}>
			<div className='container-fluid'>
				<div className='navbar-brand'>Kênh Người Bán</div>
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