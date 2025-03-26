import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();

	const [loginData, setLoginData] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [emailError, setEmailError] = useState('');
	const [tooManyAttempts, setTooManyAttempts] = useState(false);
	const [countdown, setCountdown] = useState(0);

	useEffect(() => {
		if (isAuthenticated) navigate('/');
	}, [isAuthenticated, navigate]);

	// Đếm ngược cho rate limit
	useEffect(() => {
		let timer;
		if (tooManyAttempts && countdown > 0) {
			timer = setInterval(() => {
				setCountdown(prev => {
					const newCount = prev - 1;
					if (newCount <= 0) {
						setTooManyAttempts(false);
						// Xóa thông báo lỗi khi hết thời gian đếm ngược
						setError('');
					}
					return newCount;
				});
			}, 1000);
		}
		return () => timer && clearInterval(timer);
	}, [tooManyAttempts, countdown]);

	const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData(prev => ({ ...prev, [name]: value }));
		if (error && !tooManyAttempts) setError('');
		if (name === 'email') setEmailError('');
	};

	const handleEmailBlur = () => {
		setEmailError(loginData.email && !validateEmail(loginData.email)
			? 'Vui lòng nhập email hợp lệ'
			: '');
	};

	const formatCountdown = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		if (!validateEmail(loginData.email)) {
			setEmailError('Vui lòng nhập email hợp lệ');
			setLoading(false);
			return;
		}
		if (!loginData.email || !loginData.password) {
			setError('Vui lòng nhập đầy đủ email và mật khẩu');
			setLoading(false);
			return;
		}

		try {
			const response = await authService.login(loginData);

			if (response?.user && response.token) {
				const userData = {
					id: response.user.user_id || response.user.id || response.user.userID,
					name: response.user.full_name || response.user.name,
					email: response.user.email,
					avatar: response.user.avatar || '',
					gender: response.user.gender || '',
					phone: response.user.phone || ''
				};

				setTooManyAttempts(false);
				setCountdown(0);
				setError('');
				loginAndRedirect(userData, response.token, '/list_page');
			} else {
				setError('Cấu trúc phản hồi không hợp lệ');
			}
		} catch (error) {
			if (error.response) {
				const { status } = error.response;
				if (status === 401) {
					setError('Sai tài khoản hoặc mật khẩu');
				} else if (status === 429) {
					setTooManyAttempts(true);
					// Lấy thời gian chờ từ response
					const retryAfter = error.response.headers['retry-after'] ||
						error.response.data.retryAfterSeconds || 60;
					const timeToWait = parseInt(retryAfter);
					setCountdown(timeToWait);
					setError('Quá nhiều lần đăng nhập không thành công. Vui lòng thử lại sau.');
				} else {
					setError('Sai tài khoản hoặc mật khẩu');
				}
			} else if (error.request) {
				setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
			} else {
				setError('Sai tài khoản hoặc mật khẩu');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Row cols={1} md={2} className="g-0 g-md-5">
			<Col md={6} lg={7} className="d-none d-md-flex">
				<Container className="my-auto">
					<h2 className="text-danger fw-bold">Bán hàng chuyên nghiệp</h2>
					<p className="h4 mb-5">
						Quản lý shop của bạn hiệu quả hơn với Kênh người bán
					</p>
					<img src={loginImg} alt="Đăng nhập" className="img-fluid" />
				</Container>
			</Col>
			<Col md={6} lg={5}>
				<Card className="shadow-sm">
					<Card.Header>
						<h1 className="text-center my-3">Đăng nhập</h1>
					</Card.Header>
					<Card.Body className="my-1">
						{error && (
							<div className="alert alert-danger">
								{error}
								{tooManyAttempts}
							</div>
						)}
						<form onSubmit={handleLogin}>
							<Stack direction="v" gap={3}>
								<div className="form-group">
									<div className="input-group">
										<i className="bi bi-envelope input-group-text" />
										<input
											type="email"
											name="email"
											className={`form-control ${emailError ? 'is-invalid' : ''}`}
											placeholder="Email"
											required
											value={loginData.email}
											onChange={handleChange}
											onBlur={handleEmailBlur}
											disabled={tooManyAttempts && countdown > 0}
										/>
									</div>
									{emailError && <div className="invalid-feedback d-block">{emailError}</div>}
								</div>
								<div className="input-group">
									<i className="bi bi-shield-lock input-group-text" />
									<input
										type="password"
										name="password"
										className="form-control"
										placeholder="Password"
										required
										value={loginData.password}
										onChange={handleChange}
										disabled={tooManyAttempts && countdown > 0}
									/>
								</div>
								<div className="w-100 d-flex flex-column gap-2">
									<button
										type="submit"
										className="btn btn-lg btn-success w-100 fw-bold"
										disabled={loading || emailError || (tooManyAttempts && countdown > 0)}
									>
										{loading ? (
											<>
												<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
												Đang đăng nhập...
											</>
										) : (tooManyAttempts && countdown > 0) ? (
											`Thử lại sau (${formatCountdown(countdown)})`
										) : 'Đăng nhập'}
									</button>
									<Link to="/forgot-password" className="fw-bold text-center text-decoration-none">
										Quên mật khẩu?
									</Link>
								</div>
								<div className="position-relative d-flex" style={{ height: '1rem' }}>
									<hr className="my-auto w-100" />
									<div className="position-absolute start-50 top-50 translate-middle text-center px-3 bg-white fw-bold">
										HOẶC
									</div>
								</div>
								<div className="row row-cols-2">
									<div className="col">
										<a href="http://localhost:4000/auth/google" className="btn btn-light w-100 border fw-bold text-bg-danger">
											<i className="bi bi-google me-2 d-none d-sm-inline-block" />
											<span>Google</span>
										</a>
									</div>
									<div className="col">
										<a href="http://localhost:4000/auth/facebook" className="btn btn-light w-100 border fw-bold text-bg-primary">
											<i className="bi bi-facebook me-2 d-none d-sm-inline-block" />
											<span>Facebook</span>
										</a>
									</div>
								</div>
							</Stack>
						</form>
					</Card.Body>
					<Card.Footer>
						<div className="text-center">
							<span className="fw-bold">Bạn mới đến Chợ Làng?</span>{' '}
							<Link to="/signup" className="fw-bold text-danger">Đăng ký</Link>
						</div>
					</Card.Footer>
				</Card>
			</Col>
		</Row>
	);
}

export default Login;