import { Link } from 'react-router';
import { Row, Col } from '../components/Grid';
import loginImg from '../assets/images/login.png';

function Login() {
	return (
		<div className='container-fluid container-lg'>
			<Row cols={1} md={2}>
				<Col className='p-5 d-none d-md-block'>
					<h2 className='text-danger fw-bold'>Bán hàng chuyên nghiệp</h2>
					<p className='h4 mb-5'>
						Quản lý shop của bạn một cách hiệu quả hơn với Kênh người bán hàng
					</p>
					<img src={loginImg} alt='Đăng nhập' className='img-fluid' />
				</Col>
				<Col>
					<div className='card shadow-sm'>
						<div className='card-header'>
							<h1 className='text-center'>Đăng nhập</h1>
						</div>
						<div className='card-body d-flex flex-column gap-4 my-3'>
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
								<button className='btn btn-danger w-100'>LogIn</button>
								<Link
									to='/forgot-password'
									className='fw-bold text-decoration-none'
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
									<Link className='btn btn-light w-100 border fw-bold'>
										<i className='bi bi-google me-2'></i>
										<span>Google</span>
									</Link>
								</div>
								<div className='col'>
									<Link className='btn btn-light w-100 border fw-bold'>
										<i className='bi bi-facebook me-2' />
										<span>Facebook</span>
									</Link>
								</div>
							</div>
						</div>
						<div className='card-footer'>
							<div className='text-center'>
								<span className='fw-bold'>Bạn mới đến Chợ Làng?</span>{' '}
								<Link to='signup' className='fw-bold text-danger'>
									Đăng ký
								</Link>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default Login;
