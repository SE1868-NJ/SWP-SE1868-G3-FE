import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { SellerProvider } from '../../hooks/contexts/SellerContext';
import { useEffect } from 'react';

function SellerLayout() {
	useEffect(() => {
		const style = document.createElement('style');
		style.innerHTML = `
			#sidebar {
				transition: left 0.3s ease;
			}
			.content-wrapper {
				transition: margin-left 0.3s ease, width 0.3s ease;
			}
			#brand-logo-header {
				transition: opacity 0.3s ease, display 0.3s ease;
			}
		`;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	return (
		<>
			<SellerProvider>
				<div className='d-flex'>
					<Sidebar />
					<div
						className='content-wrapper'
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