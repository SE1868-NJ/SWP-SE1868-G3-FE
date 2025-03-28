import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Stack from '../../components/Stack';
import { Row, Col } from '../../components/Grid';
import Card from '../../components/Card';
import { InputGroup, Button } from 'react-bootstrap';
import { authService } from '../../services/authService';

function Signup() {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		phone: '',
		email: '',
		password: '',
		rePassword: '',
		fullName: '',
		gender: 'male',
		dateOfBirth: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			const response = authService.register(user);
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	const token = localStorage.getItem('token');
	if (token) {
		return <Navigate to={'/list_page'} />;
	}

	return (
		<Card className='shadow-sm'>
			<Card.Header>
				<h1 className='text-center my-3'>Đăng ký</h1>
			</Card.Header>
			<Card.Body className='my-3'>
				<form onSubmit={handleSubmit}>
					<Row cols={1} md={2} className='g-3'>
						<Col>
							<Stack direction={'v'} gap={3}>
								<InputGroup>
									<i className='bi bi-phone input-group-text'></i>
									<input
										type='tel'
										name='phone'
										id='phone'
										required
										className='form-control border-light-subtle'
										placeholder='Số điện thoại'
										value={user.phone}
										onChange={handleChange}
										onBlur={handleBlur}
										style={{ boxShadow: 'none' }}
									/>
									<i className='bi bi-asterisk input-group-text text-danger' />
								</InputGroup>
								<InputGroup>
									<i className='bi bi-envelope input-group-text'></i>
									<input
										type='email'
										name='email'
										id='email'
										required
										className='form-control border-light-subtle'
										placeholder='Địa chỉ email'
										value={user.email}
										onChange={handleChange}
										onBlur={handleBlur}
										style={{ boxShadow: 'none' }}
									/>
									<i className='bi bi-asterisk input-group-text text-danger' />
								</InputGroup>
								<InputGroup>
									<i className='bi bi-key input-group-text'></i>
									<input
										type={showPassword ? 'text' : 'password'}
										name='password'
										id='password'
										required
										placeholder='Mật khẩu'
										className='form-control  border-light-subtle border-end-0'
										value={user.password}
										onChange={handleChange}
										onBlur={handleBlur}
										style={{ boxShadow: 'none' }}
									/>
									<button
										className='btn border-top border-bottom border-start-0 border-end-0'
										onClick={toggleShowPassword}
									>
										{showPassword ? (
											<i className='bi bi-eye-slash' />
										) : (
											<i className='bi bi-eye' />
										)}
									</button>
									<i className='bi bi-asterisk input-group-text text-danger' />
								</InputGroup>
								<InputGroup>
									<i className='bi bi-key input-group-text'></i>
									<input
										type={showPassword ? 'text' : 'password'}
										name='rePassword'
										id='rePassword'
										required
										placeholder='Nhập lại mật khẩu'
										className='form-control border-light-subtle border-end-0'
										value={user.rePassword}
										onChange={handleChange}
										onBlur={handleBlur}
										style={{ boxShadow: 'none' }}
									/>
									<button
										className='btn border-top border-bottom border-start-0 border-end-0'
										onClick={toggleShowPassword}
									>
										{showPassword ? (
											<i className='bi bi-eye-slash' />
										) : (
											<i className='bi bi-eye' />
										)}
									</button>
									<i className='bi bi-asterisk input-group-text text-danger' />
								</InputGroup>
							</Stack>
						</Col>
						<Col>
							<Stack direction={'v'} gap={3}>
								<InputGroup>
									<i className='bi bi-person input-group-text'></i>
									<input
										type='text'
										name='fullName'
										id='fullName'
										required
										placeholder='Họ và tên'
										className='form-control border-light-subtle'
										value={user.fullName}
										onChange={handleChange}
										onBlur={handleBlur}
										style={{ boxShadow: 'none' }}
									/>
									<i className='bi bi-asterisk input-group-text text-danger' />
								</InputGroup>
								<InputGroup>
									<i className='bi bi-gender-ambiguous input-group-text'></i>
									<select
										name='gender'
										id='gender'
										className='form-select border-light-subtle'
										value={user.gender}
										onChange={handleChange}
										onBlur={handleBlur}
										style={{ boxShadow: 'none' }}
									>
										<option value='male'>Nam</option>
										<option value='female'>Nữ</option>
										<option value='other'>Khác</option>
									</select>
									<i className='bi bi-asterisk input-group-text text-danger' />
								</InputGroup>
								<InputGroup>
									<i className='bi bi-cake2 input-group-text' />
									<input
										type='date'
										name='dateOfBirth'
										id='dateOfBirth'
										required
										className='form-control border-light-subtle'
										value={user.dateOfBirth}
										onChange={handleChange}
										onBlur={handleBlur}
										style={{ boxShadow: 'none' }}
									/>
									<i className='bi bi-asterisk input-group-text text-danger' />
								</InputGroup>
								<Button type='submit' variant='danger'>
									Tạo tài khoản
								</Button>
							</Stack>
						</Col>
					</Row>
				</form>
			</Card.Body>
			<Card.Footer>
				<div className='text-center'>
					<span className='fw-bold'>Bạn đã có tài khoản?</span>{' '}
					<Link to='/login' className='fw-bold text-danger'>
						Đăng nhập
					</Link>
				</div>
			</Card.Footer>
		</Card>
	);
}

export default Signup;
