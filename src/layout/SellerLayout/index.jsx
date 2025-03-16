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
					<div
						style={{
							marginLeft: '17rem',
							width: 'calc(100% - 17rem)',
							display: 'flex',
							flexDirection: 'column',
							minHeight: '100vh'
						}}
					>
						<div style={{
							position: 'sticky',
							top: 0,
							width: '100%',
							zIndex: 1020,
							backgroundColor: 'white'
						}}>
							<Header />
						</div>
						<div style={{
							padding: '12px',
							flex: 1,
							overflow: 'auto'
						}}>
							<Outlet />
						</div>
					</div>
				</div>
			</SellerProvider>
		</>
	);
}

export default SellerLayout;