// import React from 'react';
import { Link } from 'react-router';

function Header() {
	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top border-bottom border-1'>
			<div className='container-fluid container-lg'>
				<div className='navbar-brand'>
					<Link
						to='/'
						className='text-danger fw-bold text-decoration-none me-3'
					>
						Chợ Làng
					</Link>
					Kênh Người Bán
				</div>
				<Link
					to='/helps'
					className='text-danger text-decoration-none fw-medium'
				>
					Bạn cần giúp đỡ?
				</Link>
			</div>
		</nav>
	);
}

export default Header;
