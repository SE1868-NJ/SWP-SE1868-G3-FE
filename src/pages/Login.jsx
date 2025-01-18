import { Link } from 'react-router';
import { Row, Col } from '../components/Grid';
import loginImg from '../assets/images/login.png';

function Login() {
	return (
		<Row cols={1} md={2} className='g-0 g-md-5'>
			<Col md={6} lg={7} className='d-none d-md-flex'>
				<div className='container my-auto'>
					<h2 className='text-danger fw-bold'>Bán hàng chuyên nghiệp</h2>
					<p className='h4 mb-5'>
						Quản lý shop của bạn hiệu quả hơn với Kênh người bán hàng
					</p>
					<img src={loginImg} alt='Đăng nhập' className='img-fluid' />
				</div>
			</Col>
			<Col md={6} lg={5}>
				<div className='card w-100 shadow-sm'>
					<div className='card-header'>
						<h1 className='text-center my-3'>Đăng nhập</h1>
					</div>
					<div className='card-body vstack gap-4 my-3'>
						<div className='input-group'>
							<i className='bi bi-envelope input-group-text'></i>
							<input
								type='email'
								className='form-control'
								placeholder='Email'
							/>
						</div>
						<div className='input-group'>
							<i className='bi bi-shield-lock input-group-text' />
							<input
								type='password'
								className='form-control'
								placeholder='Password'
							/>
						</div>
						<div className='w-100 d-flex flex-column gap-2'>
							<button className='btn btn-lg btn-success w-100 fw-bold'>
								LogIn
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
								<Link className='btn btn-light w-100 border fw-bold text-bg-danger'>
									<i className='bi bi-google me-2 d-none d-sm-inline-block'></i>
									<span>Google</span>
								</Link>
							</div>
							<div className='col'>
								<Link className='btn btn-light w-100 border fw-bold text-bg-primary'>
									<i className='bi bi-facebook me-2 d-none d-sm-inline-block' />
									<span>Facebook</span>
								</Link>
							</div>
						</div>
					</div>
					<div className='card-footer'>
						<div className='text-center'>
							<span className='fw-bold'>Bạn mới đến Chợ Làng?</span>{' '}
							<Link to='/signup' className='fw-bold text-danger'>
								Đăng ký
							</Link>
						</div>
					</div>
				</div>
			</Col>
		</Row>
	);
}

export default Login;
