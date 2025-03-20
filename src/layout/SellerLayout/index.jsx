import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { SellerProvider } from '../../hooks/contexts/SellerContext';
import {Socket} from '../../services/socket';
import { useAuth } from '../../hooks/contexts/AuthContext';

function SellerLayout() {
	const { user } = useAuth();

	useEffect(() => {
		Socket.emit('join-checkout', user.shop_id);
		console.log('Join checkout room', user.shop_id);
	}, []);
	return (
		<>
			<SellerProvider>
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
			</SellerProvider>
		</>
	);
}

export default SellerLayout;
