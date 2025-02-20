import { Outlet } from 'react-router-dom';

import Header from './Header';
// import Footer from './Footer';
import Sidebar from './Sidebar';

function SellerLayout() {
	return (
		<>
			<div className='d-flex'>
				<Sidebar />
				<div className='vstack'>
					<Header />
					<div style={{ padding: '12px' }}>
						<Outlet />
					</div>
					{/* <Footer /> */}
				</div>
			</div>
		</>
	);
}

export default SellerLayout;
