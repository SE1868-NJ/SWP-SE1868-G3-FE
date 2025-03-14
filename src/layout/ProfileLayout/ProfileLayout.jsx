import Sidebar from './Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';

const ProfileLayout = () => {
	return (
		<div className='d-flex flex-column vh-100'>
			<Header />
			<div className='container py-3 flex-grow-1' style={{ marginTop: '32px' }}>
				<div className='row'>
					{/* Sidebar */}
					<div className='col-md-3 col-lg-3 p-0'>
						<Sidebar />
					</div>

					{/* Main Content */}
					<div className='col-md-9 col-lg-9 bg-light'>
						<Outlet />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ProfileLayout;
