import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../../hooks/contexts/OrderContext';
import { useAuth } from '../../hooks/contexts/AuthContext';
import { useEffect, useState } from 'react';
const Sidebar = () => {
	const { status, handleStatusChange } = useOrderContext();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [userData, setUserData] = useState(user);

	useEffect(() => {
		console.log(
			'localStorage userData khi tải trang:',
			JSON.parse(localStorage.getItem('userData')),
		);
		const updateUserData = () => {
			try {
				const storedUserData = JSON.parse(localStorage.getItem('userData'));
				if (storedUserData && storedUserData.avatar) {
					setUserData(storedUserData);
					console.log(
						'Component: Updated userData with avatar from localStorage',
						storedUserData,
					);
				} else if (user && user.avatar) {
					setUserData(user);
					console.log('Component: Using user with avatar from context', user);
				}
			} catch (error) {
				console.error('Error parsing userData from localStorage', error);
			}
		};

		updateUserData();

		window.addEventListener('userDataChanged', updateUserData);
		window.addEventListener('load', updateUserData);

		return () => {
			window.removeEventListener('userDataChanged', updateUserData);
			window.removeEventListener('load', updateUserData);
		};
	}, [user]);

	const handleItemClick = (key) => {
		handleStatusChange(key);
		if (key === 'order') {
			navigate('/orders');
		} else if (key === 'account') {
			navigate('/profile');
		}
	};

	return (
		<div className='border-end h-100'>
			{/* Hồ sơ */}
			<div className='d-flex align-items-center p-3 border-bottom'>
				<div className='me-3'>
					<img
						src={userData?.avatar || 'https://via.placeholder.com/40'}
						alt='Profile'
						className='rounded-circle'
						style={{ width: 40, height: 40, objectFit: 'cover' }}
					/>
				</div>
				<div>
					<div className='fw-bold'>{userData?.full_name || 'Tài khoản'}</div>
					<small
						className='text-muted'
						onClick={() => navigate('/profile')}
						style={{ cursor: 'pointer' }}
					>
						Sửa Hồ Sơ
					</small>
				</div>
			</div>

			{/* Danh mục */}
			<div className='py-2'>
				{[
					{ key: 'notification', icon: 'bi-bell', label: 'Thông Báo' },
					{ key: 'account', icon: 'bi-person', label: 'Tài Khoản Của Tôi' },
					{ key: 'order', icon: 'bi-file-earmark-text', label: 'Đơn Mua' },
					{ key: 'voucher', icon: 'bi-gift', label: 'Kho Voucher' },
					{ key: 'coin', icon: 'bi-coin', label: 'Shop Xu' },
				].map((item) => (
					<div
						key={item.key}
						className={`px-3 py-2 d-flex align-items-center mb-1 w-100 ${
							status === item.key ? 'text-danger' : ''
						}`}
						onClick={() => handleItemClick(item.key)}
						style={{
							cursor: 'pointer',
							fontWeight: status === item.key ? 'bold' : 'normal',
							color: status === item.key ? '#dc3545' : '#000',
						}}
					>
						<i className={`${item.icon} me-3`} style={{ width: '20px' }}></i>
						<span>{item.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
