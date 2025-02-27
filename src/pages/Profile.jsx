import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthProvider, useAuth } from '../hooks/contexts/AuthContext';
import avt1 from '../assets/images/avt1.png';
import userService from '../services/userService';

const Profile = () => {
	const { user } = useAuth(); // Lấy user từ context
	const id = user.id;

	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		...user,
	});

	const [errors, setErrors] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const errorRefs = useRef({});

	// Lấy thông tin user từ BE
	useEffect(() => {
		const fetchUser = async () => {
			const response = await userService.getUserById(id);
			setUserData(response);
		};

		fetchUser();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });

		// Validate khi nhập
		let error = '';
		if (name === 'name' && value.length > 30) {
			error = 'Tên không được quá 30 ký tự';
		}
		if (name === 'email' && !value.endsWith('@gmail.com')) {
			error = 'Email phải theo định dạng @gmail.com';
		}
		if (name === 'phone' && !/^\d{10}$/.test(value)) {
			error = 'Số điện thoại phải có đúng 10 chữ số';
		}

		setErrors((prev) => ({ ...prev, [name]: error }));
		if (error) errorRefs.current[name] = e.target;
		else delete errorRefs.current[name];
	};

	const handleEditSave = async () => {
		if (isEditing) {
			if (!user?.id) {
				console.error('Không tìm thấy ID người dùng!');
				navigate('/login');
				return;
			}

			// Kiểm tra validation
			if (Object.values(errors).some((error) => error)) {
				alert('Vui lòng sửa các lỗi trước khi lưu!');
				return;
			}

			console.log('User ID:', user.id);
			console.log('UserData trước khi gửi:', userData);

			try {
				const response = await userService.updateUser(id, userData);
				console.log('Dữ liệu sau khi cập nhật:', response);
				setUserData(response);
				alert('Cập nhật thành công!');
				setIsEditing(false);
			} catch (error) {
				console.error(
					'Lỗi khi cập nhật thông tin:',
					error.response?.data || error.message,
				);
			}
		} else {
			setIsEditing(true);
		}
	};

	const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		if (!file || !user) return;

		// Hiển thị ảnh tạm thời
		setUserData((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));

		const formData = new FormData();
		formData.append('avatar', file);

		try {
			const response = await userService.uploadAvatar(user.id, formData);
			if (response.avatarUrl) {
				// Cập nhật avatar từ URL trả về của API
				setUserData((prev) => ({ ...prev, avatar: response.avatarUrl }));
			}
		} catch (error) {
			console.log(error, 'Lỗi khi cập nhật ảnh!');
		}
	};

	return (
		<AuthProvider>
			<div className='container mt-5 d-flex '>
				{/* Sidebar */}
				<div className='col-md-2'>
					<h5 className='d-flex align-items-center'>
						<img
							src={userData.avatar}
							alt='Avatar'
							className='rounded-circle me-2'
							style={{ width: '40px', height: '40px', objectFit: 'cover' }}
						/>
						{userData.name || 'Tên User'}
					</h5>
					<ul className='list-group list-group-flush margin-right-10'>
						<li className='list-group-item border-0'>
							<i className='bi bi-person text-primary' />
							Tài khoản của tôi
							<ul>
								<li className='list-group-item border-0'>Hồ sơ</li>
								<li className='list-group-item border-0'>Ngân hàng</li>
								<li className='list-group-item border-0'>Địa chỉ</li>
								<li className='list-group-item border-0'>Đổi mật khẩu</li>
							</ul>
						</li>
						<li className='list-group-item border-0'>
							<i className='bi bi-card-list text-info' />
							Đơn mua
						</li>
						<li className='list-group-item border-0'>
							<i className='bi bi-ticket-perforated text-danger' />
							Kho voucher
						</li>
					</ul>
				</div>

				{/* Profile Form */}
				<div className='bg-light col-md-10 p-3'>
					{' '}
					{/* Container với nền trắng, padding, và bo góc */}
					<div className='row '>
						{/* Form Profile */}
						<div className='col-md-8 border-right pt-3'>
							<h4>Hồ sơ của tôi</h4>

							<div className='form-group'>
								<label>Họ và tên:</label>
								<input
									type='text'
									name='name'
									className='form-control'
									value={userData.name}
									onChange={handleChange}
									disabled={!isEditing}
								/>
								{errors.name && <p className='text-danger'>{errors.name}</p>}
							</div>
							<div className='form-group'>
								<label>Email:</label>
								<input
									type='email'
									name='email'
									className='form-control'
									value={userData.email}
									onChange={handleChange}
									disabled={!isEditing}
								/>
								{errors.email && <p className='text-danger'>{errors.email}</p>}
							</div>
							<div className='form-group'>
								<label>Số điện thoại:</label>
								<input
									type='text'
									name='phone'
									className='form-control'
									value={userData.phone}
									onChange={handleChange}
									disabled={!isEditing}
								/>
								{errors.phone && <p className='text-danger'>{errors.phone}</p>}
							</div>
							<div className='form-group'>
								<label>Giới tính:</label>
								<div>
									<input
										type='radio'
										name='gender'
										value='male'
										checked={userData.gender === 'male'}
										onChange={handleChange}
										disabled={!isEditing}
									/>{' '}
									Nam
									<input
										type='radio'
										name='gender'
										value='female'
										checked={userData.gender === 'female'}
										onChange={handleChange}
										className='ms-3'
										disabled={!isEditing}
									/>{' '}
									Nữ
									<input
										type='radio'
										name='gender'
										value='Khác'
										checked={userData.gender === 'Khác'}
										onChange={handleChange}
										className='ms-3'
										disabled={!isEditing}
									/>{' '}
									Khác
								</div>
							</div>
							<button className='btn btn-danger mt-3' onClick={handleEditSave}>
								{isEditing ? 'Lưu' : 'Cập nhật'}
							</button>
						</div>

						{/* Avatar Upload */}
						<div className='col-md-4 text-center p-3 border-start pt-2'>
							<div className='position-relative d-inline-block bg-white p-2 rounded-circle'>
								<img
									src={userData.avatar}
									alt='Avatar'
									className='rounded-circle'
									style={{ width: '160px', height: '160px' }}
								/>
							</div>
							<div className='mt-2'>
								<label className='btn btn-danger btn-sm'>
									Chọn tệp
									<input
										type='file'
										accept='.jpg,.jpeg,.png'
										onChange={handleFileUpload}
										style={{ display: 'none' }}
										disabled={!isEditing}
									/>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AuthProvider>
	);
};

export default Profile;
