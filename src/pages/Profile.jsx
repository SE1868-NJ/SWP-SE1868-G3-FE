import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthProvider, useAuth } from '../hooks/contexts/AuthContext';
import userService from '../services/userService';
import { Modal, Button } from 'react-bootstrap';

const Profile = () => {
	const { user, setUser } = useAuth();
	const id = user.id;

	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		...user,
	});

	const [avatarFile, setAvatarFile] = useState(null);
	const [errors, setErrors] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const errorRefs = useRef({});

	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [showAvatarErrorModal, setShowAvatarErrorModal] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await userService.getUserById(id);

				setUserData((prev) => ({
					...prev,
					id: response.id || prev.id,
					full_name: response.full_name || prev.full_name,
					email: response.email || prev.email,
					phone: response.phone || prev.phone,
					gender: response.gender || prev.gender,
					avatar: response.avatar || prev.avatar,
				}));
				localStorage.setItem('userData', JSON.stringify(response));
			} catch (error) {
				console.error('Lỗi khi fetch user:', error);
			}
		};

		fetchUser();
	}, [id, isEditing]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });

		let error = '';
		if (name === 'full_name' && value.length > 30) {
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
				navigate('/login');
				return;
			}

			if (Object.values(errors).some((error) => error)) {
				setModalMessage('Vui lòng sửa các lỗi trước khi lưu!');
				setShowErrorModal(true);
				return;
			}

			try {
				const updateResponse = await userService.updateUser(
					id,
					userData,
					avatarFile,
				);

				if (updateResponse) {
					setModalMessage('Cập nhật thành công!');
					setShowSuccessModal(true);
					const fetchResponse = await userService.getUserById(id);
					const updatedUserData = {
						...fetchResponse,
						id: id,
					};

					setUserData(updatedUserData);
					setUser(updatedUserData);

					localStorage.setItem('userData', JSON.stringify(updatedUserData));

					window.dispatchEvent(new Event('userDataChanged'));
					setIsEditing(false);
					setAvatarFile(null);
				} else {
					throw new Error('Cập nhật thất bại');
				}
			} catch (error) {
				console.error(
					'Lỗi khi cập nhật thông tin:',
					error.response?.data || error.message,
				);
				setModalMessage('Cập nhật thất bại!');
				setShowErrorModal(true);
			}
		} else {
			setIsEditing(true);
		}
	};

	const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		if (!file || !user) {
			return;
		}
		const maxSizeInBytes = 4 * 1024 * 1024; 
		const fileSize = file.size;

		const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
		const fileExtension = file.name.split('.').pop().toLowerCase();

		if (!validExtensions.includes(fileExtension)) {
			setModalMessage(
				'Chỉ chấp nhận các tệp ảnh có định dạng: .jpg, .jpeg, .png, .gif',
			);
			setShowAvatarErrorModal(true);
			return;
		}

		if (fileSize > maxSizeInBytes) {
			setModalMessage(
				'Kích thước file ảnh quá lớn. Vui lòng chọn file nhỏ hơn.',
			);
			setShowAvatarErrorModal(true);
			return;
		}

		setAvatarFile(file);

		setUserData((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
	};

	return (
		<div className='container mt-0 '>
			{/* Profile Form */}
			<div className='bg-light col-md-12 p-3'>
				<div className='row '>
					{/* Form Profile */}
					<div className='col-md-8 border-right pt-3'>
						<h4>Hồ sơ của tôi</h4>

						<div className='form-group'>
							<label>Họ và tên:</label>
							<input
								type='text'
								name='full_name'
								className='form-control'
								value={userData.full_name}
								onChange={handleChange}
								disabled={!isEditing}
							/>
							{errors.full_name && (
								<p className='text-danger'>{errors.full_name}</p>
							)}
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
									value='other'
									checked={userData.gender === 'other'}
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
					<div className='col-md-4 text-center p-4 border-start pt-2'>
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
							{avatarFile && isEditing && (
								<p className='mt-1 text-success'>
									Ảnh mới sẽ được cập nhật khi bạn nhấn Lưu
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			<Modal
				show={showSuccessModal}
				onHide={() => setShowSuccessModal(false)}
				centered
			>
				<Modal.Body className='text-center fs-3 fw-bold text-dark'>
					{modalMessage}
				</Modal.Body>
				<Modal.Footer className='border-0 justify-content-center'>
					<Button
						variant='secondary'
						onClick={() => setShowSuccessModal(false)}
					>
						Đóng
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Error Modal */}
			<Modal
				show={showErrorModal}
				onHide={() => setShowErrorModal(false)}
				centered
			>
				<Modal.Body className='text-center fs-5 fw-bold text-danger'>
					{modalMessage}
				</Modal.Body>
				<Modal.Footer className='border-0 justify-content-center'>
					<Button variant='secondary' onClick={() => setShowErrorModal(false)}>
						Đóng
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Avatar Error Modal */}
			<Modal
				show={showAvatarErrorModal}
				onHide={() => setShowAvatarErrorModal(false)}
				centered
			>
				<Modal.Body className='text-center fs-5 fw-bold text-danger'>
					{modalMessage}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						onClick={() => setShowAvatarErrorModal(false)}
					>
						Đóng
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Profile;
