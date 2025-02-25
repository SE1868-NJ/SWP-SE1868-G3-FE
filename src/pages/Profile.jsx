// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router';
// // import { useAuthContext } from '../context/AuthContext'; // Import AuthContext
// import avt1 from '../assets/images/avt1.png';
// import userService from '../services/userService';

// const Profile = () => {
// 	// const { user } = useAuthContext(); // Lấy user từ context
// 	const navigate = useNavigate();
// 	const [userData, setUserData] = useState({
// 		name: '',
// 		email: '',
// 		phone: '',
// 		gender: '',
// 	});
// 	//const [errors, setErrors] = useState({});
// 	const [isEditing, setIsEditing] = useState(false);
// 	const [avatar, setAvatar] = useState(avt1);
// 	const errorRefs = useRef({});

// 	// Lấy thông tin user từ BE
// 	useEffect(() => {
// 		if (!user) return; // Nếu chưa có user, không fetch

// 		const fetchUser = async () => {
// 			try {
// 				const response = await userService.getUserById(user.id); // Lấy id từ context
// 				if (response) {
// 					setUserData(response);
// 					setAvatar(response.avatar || avt1);
// 				}
// 			} catch (error) {
// 				alert('Lỗi khi tải dữ liệu người dùng!');
// 				navigate('/');
// 			}
// 		};

// 		fetchUser();
// 	}, [user, navigate]);

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setUserData({ ...userData, [name]: value });

// 		// Validate khi nhập
// 		let error = '';
// 		if (name === 'name' && value.length > 30) {
// 			error = 'Tên không được quá 30 ký tự';
// 		}
// 		if (name === 'email' && !value.endsWith('@gmail.com')) {
// 			error = 'Email phải theo định dạng @gmail.com';
// 		}
// 		if (name === 'phone' && !/^\d{10}$/.test(value)) {
// 			error = 'Số điện thoại phải có đúng 10 chữ số';
// 		}

// 		setErrors((prev) => ({ ...prev, [name]: error }));
// 		if (error) errorRefs.current[name] = e.target;
// 		else delete errorRefs.current[name];
// 	};

// 	const handleEditSave = async () => {
// 		if (isEditing) {
// 			if (!user) return; // Nếu chưa có user, không làm gì cả

// 			try {
// 				await userService.updateUser(user.id, userData);
// 				alert('Cập nhật thành công!');
// 				setIsEditing(false);
// 			} catch (error) {
// 				alert('Lỗi khi cập nhật thông tin!');
// 			}
// 		} else {
// 			setIsEditing(true);
// 		}
// 	};

// 	const handleFileUpload = async (e) => {
// 		const file = e.target.files[0];
// 		if (!file || !user) return;

// 		setAvatar(URL.createObjectURL(file)); // Hiển thị ảnh tạm thời

// 		const formData = new FormData();
// 		formData.append('avatar', file);

// 		try {
// 			const response = await userService.uploadAvatar(user.id, formData);
// 			if (response.avatarUrl) {
// 				setAvatar(response.avatarUrl); // Cập nhật ảnh mới từ API
// 			}
// 		} catch (error) {
// 			alert('Lỗi khi tải ảnh lên!');
// 		}
// 	};

// 	return (
// 		<div className='container mt-5 d-flex'>
// 			{/* Sidebar */}
// 			<div className='col-md-2'>
// 				<h5 className='d-flex align-items-center'>
// 					<img
// 						src={avatar}
// 						alt='Avatar'
// 						className='rounded-circle me-2'
// 						style={{ width: '40px', height: '40px', objectFit: 'cover' }}
// 					/>
// 					{userData.name || 'Tên User'}
// 				</h5>
// 			</div>

// 			{/* Profile Form */}
// 			<div className='bg-light col-md-10 p-3'>
// 				<h4>Hồ sơ của tôi</h4>
// 				<div className='form-group'>
// 					<label>Họ và tên:</label>
// 					<input
// 						type='text'
// 						name='name'
// 						className='form-control'
// 						value={userData.name}
// 						onChange={handleChange}
// 						disabled={!isEditing}
// 					/>
// 				</div>
// 				<div className='form-group'>
// 					<label>Email:</label>
// 					<input
// 						type='email'
// 						name='email'
// 						className='form-control'
// 						value={userData.email}
// 						onChange={handleChange}
// 						disabled={!isEditing}
// 					/>
// 				</div>
// 				<div className='form-group'>
// 					<label>Số điện thoại:</label>
// 					<input
// 						type='text'
// 						name='phone'
// 						className='form-control'
// 						value={userData.phone}
// 						onChange={handleChange}
// 						disabled={!isEditing}
// 					/>
// 				</div>
// 				<button className='btn btn-danger mt-3' onClick={handleEditSave}>
// 					{isEditing ? 'Lưu' : 'Cập nhật'}
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default Profile;
