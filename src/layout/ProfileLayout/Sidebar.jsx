import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../../hooks/contexts/OrderContext';
import { useAuth } from '../../hooks/contexts/AuthContext';
import { useEffect, useState } from 'react';

const Sidebar = () => {
	const { status, handleStatusChange } = useOrderContext();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [userData, setUserData] = useState(user);
	const [forceUpdate, setForceUpdate] = useState(Date.now());

	useEffect(() => {
		const updateUserData = () => {
			try {
				const storedUserData = JSON.parse(localStorage.getItem('userData'));
				if (storedUserData) {
					setUserData(prev => ({
						...prev,
						...storedUserData
					}));
					setForceUpdate(Date.now());
				} else if (user) {
					setUserData(user);
					setForceUpdate(Date.now());
				}
			} catch (error) {
				console.error('Error parsing userData from localStorage', error);
			}
		};

		// Initial update
		updateUserData();

		// Listen for changes in userData
		const handleUserDataChanged = () => {
			updateUserData();
		};

		window.addEventListener('userDataChanged', handleUserDataChanged);
		window.addEventListener('load', updateUserData);

		return () => {
			window.removeEventListener('userDataChanged', handleUserDataChanged);
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

	// Hàm giúp lấy đúng URL hình ảnh và thêm timestamp để tránh cache
	const getAvatarUrl = (path) => {
		if (!path) return "https://via.placeholder.com/40";

		// Nếu là URL đầy đủ (bắt đầu bằng http)
		if (path.startsWith('http')) {
			// Thêm timestamp để tránh cache
			return `${path}?t=${forceUpdate}`;
		}

		// Nếu là đường dẫn tương đối
		return `http://localhost:4000${path}?t=${forceUpdate}`;
	};

	// Get user's display name
	const getUserDisplayName = () => {
		if (userData) {
			return userData.full_name || userData.name || 'Tài khoản';
		}
		return 'Tài khoản';
	};

	return (
		<div className='border-end h-100'>
			{/* Hồ sơ */}
			<div className='d-flex align-items-center p-3 border-bottom'>
				<div className='me-3'>
					<img
						src={getAvatarUrl(userData?.avatar)}
						alt='Profile'
						className='rounded-circle'
						style={{ width: 40, height: 40, objectFit: 'cover' }}
						onError={(e) => {
							e.target.onerror = null;
							e.target.src = "https://via.placeholder.com/40";
						}}
					/>
				</div>
				<div>
					<div className='fw-bold'>{getUserDisplayName()}</div>
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
				].map((item) => (
					<div
						key={item.key}
						className={`px-3 py-2 d-flex align-items-center mb-1 w-100 ${status === item.key ? 'text-danger' : ''
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