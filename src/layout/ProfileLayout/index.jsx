import { Outlet } from 'react-router-dom';
//import Header from './Header';
 import Sidebar from './Sidebar';
import { UserProvider } from '../../hooks/contexts/AuthContext';
import {CartHeader} from './CartHeader';
function ProfileLayout() {
	return (
		<>
			<UserProvider>
				<div className='d-flex'>
					<Sidebar />
					<div className='vstack'>
						<CartHeader />
						<div style={{ padding: '12px' }}>
							<Outlet />
						</div>
						{/* <Footer /> */}
					</div>
				</div>
			</UserProvider>
		</>
	);
}

export default ProfileLayout;
