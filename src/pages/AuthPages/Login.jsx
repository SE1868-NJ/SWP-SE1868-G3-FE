import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth, useAuthActions } from '../../hooks/contexts/AuthContext';
import Container from '../../components/Container';
import Stack from '../../components/Stack';
import { Row, Col } from '../../components/Grid';
import Card from '../../components/Card';
import { authService } from '../../services/authService';
import loginImg from '../../assets/images/login.png';

function Login() {
	const { isAuthenticated } = useAuth();
	const { loginAndRedirect } = useAuthActions();
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value,
		});
	};

	// Trong Login.js:
	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await authService.login(loginData);
			console.log('Login response:', response);

			if (response && response.user && response.token) {
				// Map dữ liệu user cho phù hợp trước khi lưu
				const userData = {
					id: response.user.user_id || response.user.id || response.user.userID,
					name: response.user.full_name || response.user.name,
					email: response.user.email,
					avatar: response.user.avatar || "",
					gender: response.user.gender || "",
					phone: response.user.phone || ""
				};

				console.log('Mapped user data:', userData);

				// Sử dụng loginAndRedirect
				loginAndRedirect(userData, response.token, '/list_page');
			} else {
				setError('Cấu trúc phản hồi không hợp lệ');
			}
		} catch (error) {
			console.error('Login error:', error);
			setError(error.message || 'Đăng nhập không thành công');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Row cols={1} md={2} className='g-0 g-md-5'>
			<Col md={6} lg={7} className='d-none d-md-flex'>
				<Container className='my-auto'>
					<h2 className='text-danger fw-bold'>Bán hàng chuyên nghiệp</h2>
					<p className='h4 mb-5'>
						Quản lý shop của bạn hiệu quả hơn với Kênh người bán hàng
					</p>
					<img src={loginImg} alt='Đăng nhập' className='img-fluid' />
				</Container>
			</Col>
			<Col md={6} lg={5}>
				<Card className='shadow-sm'>
					<Card.Header>
						<h1 className='text-center my-3'>Đăng nhập</h1>
					</Card.Header>
					<Card.Body className='my-3'>
						{error && (
							<div className="alert alert-danger" role="alert">
								{error}
							</div>
						)}
						<form onSubmit={handleLogin}>
							<Stack direction={'v'} gap={3}>
								<div className='input-group'>
									<i className='bi bi-envelope input-group-text'></i>
									<input
										type='email'
										name='email'
										className='form-control'
										placeholder='Email'
										required
										value={loginData.email}
										onChange={handleChange}
									/>
								</div>
								<div className='input-group'>
									<i className='bi bi-shield-lock input-group-text' />
									<input
										type='password'
										name='password'
										className='form-control'
										placeholder='Password'
										required
										value={loginData.password}
										onChange={handleChange}
									/>
								</div>
								<div className='w-100 d-flex flex-column gap-2'>
									<button
										type='submit'
										className='btn btn-lg btn-success w-100 fw-bold'
										disabled={loading}
									>
										{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
									</button>
									<Link
										to='/forgot-password'
										className='fw-bold text-center text-decoration-none'
									>
										Quên mật khẩu?
									</Link>
								</div>
								<div
									className='position-relative d-flex'
									style={{ height: '1rem' }}
								>
									<hr className='my-auto w-100' />
									<div className='position-absolute start-50 top-50 translate-middle text-center px-3 bg-white fw-bold'>
										HOẶC
									</div>
								</div>
								<div className='row row-cols-2'>
									<div className='col'>
										<a
											href="http://localhost:4000/auth/google"
											className='btn btn-light w-100 border fw-bold text-bg-danger'
										>
											<i className='bi bi-google me-2 d-none d-sm-inline-block'></i>
											<span>Google</span>
										</a>
									</div>
									<div className='col'>
										<a
											href="http://localhost:4000/auth/facebook"
											className='btn btn-light w-100 border fw-bold text-bg-primary'
										>
											<i className='bi bi-facebook me-2 d-none d-sm-inline-block' />
											<span>Facebook</span>
										</a>
									</div>
								</div>
							</Stack>
						</form>
					</Card.Body>
					<Card.Footer>
						<div className='text-center'>
							<span className='fw-bold'>Bạn mới đến Chợ Làng?</span>{' '}
							<Link to='/signup' className='fw-bold text-danger'>
								Đăng ký
							</Link>
						</div>
					</Card.Footer>
				</Card>
			</Col >
		</Row >
	);
}

export default Login;