import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShopFooter = () => {
	const { id } = useParams();
	const [shopInfo, setShopInfo] = useState({
		shop_address: '123 Đường ABC, TP. HCM',
		shop_phone: '0123 456 789',
		shop_email: 'contact@example.com'
	});

	// Trong thực tế, bạn có thể lấy thông tin shop từ context hoặc từ API
	// Ở đây tôi chỉ hiển thị thông tin cố định

	return (
		<div style={{
			backgroundColor: '#fff',
			padding: '30px',
			marginTop: '30px',
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
								Địa chỉ: {shopInfo.shop_address}
							</span>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
							<span style={{ color: '#ee4d2d', marginRight: '10px', minWidth: '15px' }}>📞</span>
							<span style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>
								Điện thoại: {shopInfo.shop_phone}
							</span>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
							<span style={{ color: '#ee4d2d', marginRight: '10px', minWidth: '15px' }}>✉️</span>
							<span style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>
								Email: {shopInfo.shop_email}
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
							<a href={`/shop/${id}/about`}
								style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}
								onMouseOver={(e) => e.target.style.color = '#ee4d2d'}
								onMouseOut={(e) => e.target.style.color = '#555'}>
								<span style={{ marginRight: '10px', minWidth: '15px' }}>›</span>
								<span>Về Chúng Tôi</span>
							</a>
						</div>

						<div style={{ marginBottom: '12px' }}>
							<a href={`/shop/${id}/policy`}
								style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}
								onMouseOver={(e) => e.target.style.color = '#ee4d2d'}
								onMouseOut={(e) => e.target.style.color = '#555'}>
								<span style={{ marginRight: '10px', minWidth: '15px' }}>›</span>
								<span>Chính Sách</span>
							</a>
						</div>

						<div style={{ marginBottom: '12px' }}>
							<a href={`/shop/${id}/support`}
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
							<a href={`/shop/${id}/buying-guide`}
								style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}
								onMouseOver={(e) => e.target.style.color = '#ee4d2d'}
								onMouseOut={(e) => e.target.style.color = '#555'}>
								<span style={{ marginRight: '10px', minWidth: '15px' }}>›</span>
								<span>Hướng Dẫn Mua Hàng</span>
							</a>
						</div>

						<div style={{ marginBottom: '12px' }}>
							<a href={`/shop/${id}/payment`}
								style={{ color: '#555', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}
								onMouseOver={(e) => e.target.style.color = '#ee4d2d'}
								onMouseOut={(e) => e.target.style.color = '#555'}>
								<span style={{ marginRight: '10px', minWidth: '15px' }}>›</span>
								<span>Phương Thức Thanh Toán</span>
							</a>
						</div>

						<div style={{ marginBottom: '12px' }}>
							<a href={`/shop/${id}/shipping`}
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