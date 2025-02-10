// import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

function Header() {
	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top border-bottom border-1'>
			<Container fluid='lg'>
				<div className='navbar-brand'>
					<Link
						to='/'
						className='text-danger fw-bold text-decoration-none me-3'
					>
						<i className='bi bi-bag-heart-fill me-2'></i>
						<span>Chợ Làng</span>
					</Link>
					Kênh Người Bán
				</div>
				<Link
					to='/helps'
					className='text-danger text-decoration-none fw-medium'
				>
					Bạn cần giúp đỡ?
				</Link>
			</Container>
		</nav>
	);
}

export default Header;
