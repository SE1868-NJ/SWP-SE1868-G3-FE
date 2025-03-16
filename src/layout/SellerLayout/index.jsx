import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { SellerProvider } from '../../hooks/contexts/SellerContext';

function SellerLayout() {
	return (
		<>
			<SellerProvider>
				<div className='d-flex'>
					<Sidebar />
					<div className='vstack' style={{ marginLeft: '17rem', width: '100%' }}>
						<Header />
						<div style={{ padding: '12px' }}>
							<Outlet />
						</div>
						{/* <Footer /> */}
					</div>
				</div>
			</SellerProvider>
		</>
	);
}

export default SellerLayout;