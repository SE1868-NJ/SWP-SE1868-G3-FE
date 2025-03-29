import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/contexts/AuthContext';
import userService from '../services/userService';
import { Modal, Button } from 'react-bootstrap';

const Profile = () => {
	const { user, setUser } = useAuth();
	const id = user?.id;

	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		...user,
	});

	const [avatarFile, setAvatarFile] = useState(null);
	const [errors, setErrors] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const errorRefs = useRef({});

	// Thay thế các state modal cũ bằng state mới
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState('success'); // 'success', 'error', 'warning'
	const [modalMessage, setModalMessage] = useState('');

	const [previewImage, setPreviewImage] = useState(null);
	const [forceUpdate, setForceUpdate] = useState(Date.now());

	useEffect(() => {
		if (!id) {
			navigate('/login');
			return;
		}

		const fetchUser = async () => {
			try {
				const response = await userService.getUserById(id);

				setUserData((prev) => ({
					...prev,
					id: response.user_id || prev.id,
					full_name: response.full_name || prev.full_name,
					email: response.email || prev.email,
					phone: response.phone || prev.phone,
					gender: response.gender || prev.gender,
					avatar: response.avatar || prev.avatar,
				}));

				// Update localStorage with the latest user data
				localStorage.setItem('userData', JSON.stringify(response));

				// Trigger event to notify other components
				window.dispatchEvent(new Event('userDataChanged'));
			} catch (error) {
				console.error('Lỗi khi fetch user:', error);
			}
		};

		fetchUser();
	}, [id, navigate]);

	// Hàm hiển thị modal thông báo
	const showNotification = (type, message) => {
		setModalType(type);
		setModalMessage(message);
		setShowModal(true);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });

		let error = '';
		if (name === 'full_name' && value.length > 30) {
			error = 'Tên không được quá 30 ký tự';
		}

		// Kiểm tra email chỉ cần có @ và dấu .
		if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			error = 'Email phải chứa @ và dấu chấm (.)';
		}

		// Kiểm tra số điện thoại: bắt đầu bằng số 0, đúng 10 chữ số, chỉ chứa số
		if (name === 'phone') {
			if (!/^0\d{9}$/.test(value)) {
				error = 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số';
			} else if (/\D/.test(value)) {
				error = 'Số điện thoại chỉ được chứa các chữ số';
			}
		}

		setErrors((prev) => ({ ...prev, [name]: error }));
		if (error) errorRefs.current[name] = e.target;
		else delete errorRefs.current[name];
	};

	const validateForm = () => {
		let tempErrors = {};
		let isValid = true;

		// Validate full_name
		if (!userData.full_name?.trim()) {
			tempErrors.full_name = 'Tên không được để trống';
			isValid = false;
		} else if (userData.full_name.length > 30) {
			tempErrors.full_name = 'Tên không được quá 30 ký tự';
			isValid = false;
		}

		// Validate email - chỉ cần có @ và dấu .
		if (!userData.email?.trim()) {
			tempErrors.email = 'Email không được để trống';
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
			tempErrors.email = 'Email phải chứa @ và dấu chấm (.)';
			isValid = false;
		}

		// Validate phone - bắt đầu bằng số 0, có đúng 10 chữ số, chỉ chứa số
		if (userData.phone) {
			if (!/^0\d{9}$/.test(userData.phone)) {
				tempErrors.phone = 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số';
				isValid = false;
			} else if (/\D/.test(userData.phone)) {
				tempErrors.phone = 'Số điện thoại chỉ được chứa các chữ số';
				isValid = false;
			}
		}

		setErrors(tempErrors);
		return isValid;
	};

	const handleEditSave = async () => {
		if (isEditing) {
			if (!id) {
				navigate('/login');
				return;
			}

			if (!validateForm()) {
				showNotification('error', 'Vui lòng sửa các lỗi trước khi lưu!');
				return;
			}

			try {
				setIsLoading(true);
				const updateResponse = await userService.updateUser(
					id,
					userData,
					avatarFile,
				);

				setIsLoading(false);

				// Hiển thị thông báo thành công
				showNotification('success', 'Cập nhật thành công!');

				// Cập nhật userData nếu API trả về dữ liệu
				if (updateResponse.data) {
					const updatedUser = updateResponse.data;

					// Cập nhật userData state
					setUserData(prev => ({
						...prev,
						id: updatedUser.user_id || prev.id,
						full_name: updatedUser.full_name || prev.full_name,
						email: updatedUser.email || prev.email,
						phone: updatedUser.phone || prev.phone,
						gender: updatedUser.gender || prev.gender,
						avatar: updatedUser.avatar || prev.avatar,
					}));

					// Cập nhật user context
					if (typeof setUser === 'function') {
						setUser(prev => ({
							...prev,
							id: updatedUser.user_id || prev.id,
							full_name: updatedUser.full_name || prev.full_name,
							name: updatedUser.full_name || prev.name, // Đảm bảo cả name cũng được cập nhật
							email: updatedUser.email || prev.email,
							phone: updatedUser.phone || prev.phone,
							gender: updatedUser.gender || prev.gender,
							avatar: updatedUser.avatar || prev.avatar,
						}));
					}

					// Cập nhật localStorage
					localStorage.setItem('userData', JSON.stringify(updatedUser));

					// Trigger sự kiện để các component khác cập nhật
					window.dispatchEvent(new Event('userDataChanged'));
				}

				// Force update UI
				setForceUpdate(Date.now());

				// Reset trạng thái
				setIsEditing(false);
				setAvatarFile(null);
				setPreviewImage(null);
			} catch (error) {
				setIsLoading(false);
				console.error('Lỗi khi cập nhật thông tin:', error);
				showNotification('error', 'Cập nhật thất bại!');
			}
		} else {
			setIsEditing(true);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setPreviewImage(null);
		setAvatarFile(null);
		setErrors({});
		// Khôi phục dữ liệu ban đầu
		setUserData({
			...user,
		});
	};

	const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		if (!file || !user) {
			return;
		}
		const maxSizeInBytes = 2 * 1024 * 1024; // 2MB theo giới hạn của server
		const fileSize = file.size;

		const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
		if (!validTypes.includes(file.type)) {
			showNotification('error', 'Chỉ chấp nhận các tệp ảnh có định dạng: JPG, JPEG, PNG');
			return;
		}

		if (fileSize > maxSizeInBytes) {
			showNotification('error', 'Kích thước file ảnh quá lớn. Vui lòng chọn file nhỏ hơn 2MB.');
			return;
		}

		setAvatarFile(file);

		// Tạo URL xem trước
		const reader = new FileReader();
		reader.onload = (e) => {
			setPreviewImage(e.target.result);
		};
		reader.readAsDataURL(file);
	};

	// Hàm giúp lấy đúng URL hình ảnh và thêm timestamp để tránh cache
	const getImageUrl = (path) => {
		if (!path) return "https://via.placeholder.com/300";

		// Nếu là URL đầy đủ (bắt đầu bằng http)
		if (path.startsWith('http')) {
			// Thêm timestamp để tránh cache
			return `${path}?t=${forceUpdate}`;
		}

		// Nếu là đường dẫn tương đối
		return `http://localhost:4000${path}?t=${forceUpdate}`;
	};

	// Hiển thị ảnh đại diện - ưu tiên dùng previewImage khi đang chỉnh sửa
	const displayAvatar = () => {
		if (previewImage) {
			return previewImage;
		} else if (userData.avatar) {
			return getImageUrl(userData.avatar);
		}
		return "https://via.placeholder.com/300";
	};

	return (
		<div className='container mt-0 '>
			{/* Profile Form */}
			<div className='bg-light col-md-12 p-3'>
				<div className='row '>
					{/* Form Profile */}
					<div className='col-md-8 border-right pt-3'>
						<div className="d-flex justify-content-between align-items-center mb-4">
							<h4 className="m-0 fw-bold">Hồ sơ của tôi</h4>
							<div>
								{isEditing ? (
									<div className="btn-group">
										<button
											className="btn btn-danger btn-sm"
											onClick={handleEditSave}
											disabled={isLoading}
										>
											{isLoading ? (
												<>
													<span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
													Đang lưu...
												</>
											) : (
												<>
													<i className="bi bi-check-circle me-1"></i>Lưu
												</>
											)}
										</button>
										<button
											className="btn btn-outline-secondary btn-sm"
											onClick={handleCancel}
											disabled={isLoading}
										>
											<i className="bi bi-x-circle me-1"></i>Hủy
										</button>
									</div>
								) : (
									<button
										className="btn btn-danger btn-sm"
										onClick={() => setIsEditing(true)}
									>
										<i className="bi bi-pencil me-1"></i>Chỉnh sửa
									</button>
								)}
							</div>
						</div>

						{isEditing && (
							<p className="text-muted mb-3">
								<span className="text-danger">*</span> Trường bắt buộc
							</p>
						)}

						<div className='form-group mb-3'>
							<label className="fw-bold">
								Họ và tên:
								<span className="text-danger ms-1">*</span>
							</label>
							<div>
								{isEditing ? (
									<div>
										<input
											type='text'
											name='full_name'
											className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
											value={userData.full_name || ''}
											onChange={handleChange}
											placeholder="Nhập họ và tên"
										/>
										{errors.full_name && (
											<div className="invalid-feedback">
												{errors.full_name}
											</div>
										)}
									</div>
								) : (
									<div className="form-control-plaintext">
										{userData.full_name || 'Chưa có thông tin'}
									</div>
								)}
							</div>
						</div>
						<div className='form-group mb-3'>
							<label className="fw-bold">
								Email:
								<span className="text-danger ms-1">*</span>
							</label>
							<div>
								{isEditing ? (
									<div>
										<input
											type='email'
											name='email'
											className={`form-control ${errors.email ? 'is-invalid' : ''}`}
											value={userData.email || ''}
											onChange={handleChange}
											placeholder="example@gmail.com"
										/>
										{errors.email && (
											<div className="invalid-feedback">
												{errors.email}
											</div>
										)}
									</div>
								) : (
									<div className="form-control-plaintext">
										{userData.email || 'Chưa có thông tin'}
									</div>
								)}
							</div>
						</div>
						<div className='form-group mb-3'>
							<label className="fw-bold">
								Số điện thoại:
								<span className="text-danger ms-1">*</span>
							</label>
							<div>
								{isEditing ? (
									<div>
										<input
											type='text'
											name='phone'
											className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
											value={userData.phone || ''}
											onChange={handleChange}
											placeholder="Nhập số điện thoại"
										/>
										{errors.phone && (
											<div className="invalid-feedback">
												{errors.phone}
											</div>
										)}
									</div>
								) : (
									<div className="form-control-plaintext">
										{userData.phone || 'Chưa có thông tin'}
									</div>
								)}
							</div>
						</div>
						<div className='form-group mb-3'>
							<label className="fw-bold">Giới tính:</label>
							<div>
								{isEditing ? (
									<div>
										<div className="form-check form-check-inline">
											<input
												type='radio'
												name='gender'
												id="genderMale"
												className="form-check-input"
												value='male'
												checked={userData.gender === 'male'}
												onChange={handleChange}
											/>
											<label className="form-check-label" htmlFor="genderMale">Nam</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												type='radio'
												name='gender'
												id="genderFemale"
												className="form-check-input"
												value='female'
												checked={userData.gender === 'female'}
												onChange={handleChange}
											/>
											<label className="form-check-label" htmlFor="genderFemale">Nữ</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												type='radio'
												name='gender'
												id="genderOther"
												className="form-check-input"
												value='other'
												checked={userData.gender === 'other'}
												onChange={handleChange}
											/>
											<label className="form-check-label" htmlFor="genderOther">Khác</label>
										</div>
									</div>
								) : (
									<div className="form-control-plaintext">
										{userData.gender === 'male' ? 'Nam' :
											userData.gender === 'female' ? 'Nữ' :
												userData.gender === 'other' ? 'Khác' : 'Chưa có thông tin'}
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Avatar Upload */}
					<div className='col-md-4 text-center p-4 border-start pt-5'>
						<div className="text-center">
							<p className="fw-bold mb-2">Ảnh đại diện</p>
							<div className="d-flex justify-content-center align-items-center mb-3">
								<img
									src={displayAvatar()}
									alt="User avatar"
									className="img-fluid rounded-circle border"
									style={{ width: '160px', height: '160px', objectFit: 'cover' }}
									onError={(e) => {
										e.target.onerror = null;
										e.target.src = "https://via.placeholder.com/300";
									}}
								/>
							</div>
							{isEditing && (
								<div className="mb-3">
									<input
										type="file"
										className="form-control form-control-sm"
										accept="image/jpeg,image/jpg,image/png"
										onChange={handleFileUpload}
									/>
									<div className="form-text text-muted mt-2 small">
										<small>Tối đa: 2MB • Định dạng: JPG, JPEG, PNG</small>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Thông báo Modal - sử dụng một modal duy nhất */}
			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
				centered
			>
				<Modal.Header closeButton className="border-0">
					<Modal.Title className={`text-${modalType === 'success' ? 'success' : modalType === 'error' ? 'danger' : 'warning'}`}>
						{modalType === 'success' ? (
							<><i className="bi bi-check-circle-fill me-2"></i>Thành công</>
						) : modalType === 'error' ? (
							<><i className="bi bi-exclamation-triangle-fill me-2"></i>Lỗi</>
						) : (
							<><i className="bi bi-exclamation-circle-fill me-2"></i>Cảnh báo</>
						)}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center fs-5">
					{modalMessage}
				</Modal.Body>
				<Modal.Footer className="border-0 justify-content-center">
					<Button
						variant={modalType === 'success' ? 'success' : modalType === 'error' ? 'danger' : 'warning'}
						onClick={() => setShowModal(false)}
					>
						Đóng
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Profile;