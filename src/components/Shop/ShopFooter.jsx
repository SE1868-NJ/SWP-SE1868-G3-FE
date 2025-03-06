import React from 'react';

const ShopFooter = () => {
	return (
		<div style={{
			backgroundColor: '#fff',
			padding: '30px',
			// margin: '15px',
			marginTop: '30px',
			// borderRadius: '10px',
			boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
			border: '1px solid #f0f0f0'
		}}>
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				maxWidth: '1200px',
				margin: '0 auto',
				flexWrap: 'wrap',
				gap: '40px'
			}}>
				{/* Cột 1: Thông Tin Liên Hệ */}
				<div style={{ flex: '1', minWidth: '200px', maxWidth: '300px', marginBottom: '20px' }}>
					<h4 style={{
						fontWeight: '700',
						marginBottom: '18px',
						fontSize: '17px',
						textAlign: 'center',
						position: 'relative',
						paddingBottom: '10px'
					}}>
						Thông Tin Liên Hệ
						<span style={{
							position: 'absolute',
							bottom: '0',
							left: '50%',
							transform: 'translateX(-50%)',
							width: '40px',
							height: '3px',
							backgroundColor: '#ee4d2d',
							borderRadius: '2px'
						}}></span>
					</h4>

					<div style={{ paddingLeft: '30px' }}>
						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
							<span style={{ color: '#ee4d2d', marginRight: '10px', minWidth: '15px' }}>📍</span>
							<span style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>
								Địa chỉ: 123 Đường ABC, TP. HCM
							</span>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
							<span style={{ color: '#ee4d2d', marginRight: '10px', minWidth: '15px' }}>📞</span>
							<span style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>
								Điện thoại: 0123 456 789
							</span>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
							<span style={{ color: '#ee4d2d', marginRight: '10px', minWidth: '15px' }}>✉️</span>
							<span style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>
								Email: contact@example.com
							</span>
						</div>
					</div>
				</div>

				{/* Cột 2: Liên Kết */}
				<div style={{ flex: '1', minWidth: '200px', maxWidth: '300px', marginBottom: '20px' }}>
					<h4 style={{
						fontWeight: '700',
						marginBottom: '18px',
						fontSize: '17px',
						textAlign: 'center',
						position: 'relative',
						paddingBottom: '10px'
					}}>
						Liên Kết
						<span style={{
							position: 'absolute',
							bottom: '0',
							left: '50%',
							transform: 'translateX(-50%)',
							width: '40px',
							height: '3px',
							backgroundColor: '#ee4d2d',
							borderRadius: '2px'
						}}></span>
					</h4>

					<div style={{ paddingLeft: '85px' }}>
						<div style={{ marginBottom: '12px' }}>
							<a href="#"
								style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}
								onMouseOver={(e) => e.target.style.color = '#ee4d2d'}
								onMouseOut={(e) => e.target.style.color = '#555'}>
								<span style={{ marginRight: '10px', minWidth: '15px' }}>›</span>
								<span>Về Chúng Tôi</span>
							</a>
						</div>

						<div style={{ marginBottom: '12px' }}>
							<a href="#"
								style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}
								onMouseOver={(e) => e.target.style.color = '#ee4d2d'}
								onMouseOut={(e) => e.target.style.color = '#555'}>
								<span style={{ marginRight: '10px', minWidth: '15px' }}>›</span>
								<span>Chính Sách</span>
							</a>
						</div>

						<div style={{ marginBottom: '12px' }}>
							<a href="#"
								style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}
								onMouseOver={(e) => e.target.style.color = '#ee4d2d'}
								onMouseOut={(e) => e.target.style.color = '#555'}>
								<span style={{ marginRight: '10px', minWidth: '15px' }}>›</span>
								<span>Hỗ Trợ</span>
							</a>
						</div>
					</div>
				</div>

				{/* Cột 3: Dịch Vụ Khách Hàng */}
				<div style={{ flex: '1', minWidth: '200px', maxWidth: '300px', marginBottom: '20px' }}>
					<h4 style={{
						fontWeight: '700',
						marginBottom: '18px',
						fontSize: '17px',
						textAlign: 'center',
						position: 'relative',
						paddingBottom: '10px'
					}}>
						Dịch Vụ Khách Hàng
						<span style={{
							position: 'absolute',
							bottom: '0',
							left: '50%',
							transform: 'translateX(-50%)',
							width: '40px',
							height: '3px',
							backgroundColor: '#ee4d2d',
							borderRadius: '2px'
						}}></span>
					</h4>

					<div style={{ paddingLeft: '55px' }}>
						<div style={{ marginBottom: '12px' }}>
							<a href="#"
								style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}
								onMouseOver={(e) => e.target.style.color = '#ee4d2d'}
								onMouseOut={(e) => e.target.style.color = '#555'}>
								<span style={{ marginRight: '10px', minWidth: '15px' }}>›</span>
								<span>Hướng Dẫn Mua Hàng</span>
							</a>
						</div>

						<div style={{ marginBottom: '12px' }}>
							<a href="#"
								style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}
								onMouseOver={(e) => e.target.style.color = '#ee4d2d'}
								onMouseOut={(e) => e.target.style.color = '#555'}>
								<span style={{ marginRight: '10px', minWidth: '15px' }}>›</span>
								<span>Phương Thức Thanh Toán</span>
							</a>
						</div>

						<div style={{ marginBottom: '12px' }}>
							<a href="#"
								style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}
								onMouseOver={(e) => e.target.style.color = '#ee4d2d'}
								onMouseOut={(e) => e.target.style.color = '#555'}>
								<span style={{ marginRight: '10px', minWidth: '15px' }}>›</span>
								<span>Chính Sách Vận Chuyển</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopFooter;