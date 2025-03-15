import React from 'react';

const ShopFooter = ({ shopInfo }) => {
	return (
		<div style={{
			backgroundColor: '#fff',
			padding: '10px',
			marginTop: '10px',
			boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
			border: '1px solid #f0f0f0'
		}}>
			<div style={{
				maxWidth: '1200px',
				margin: '0 auto',
				display: 'flex',
				justifyContent: 'center'
			}}>
				<div style={{
					minWidth: '200px',
					maxWidth: '300px',
				}}>
					<h4 style={{
						fontWeight: '700',
						marginBottom: '15px',
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
						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
							<span style={{ color: '#ee4d2d', marginRight: '10px', minWidth: '15px' }}>📍</span>
							<span style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>
								Địa chỉ: {shopInfo?.shop_address || 'Đang cập nhật'}
							</span>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
							<span style={{ color: '#ee4d2d', marginRight: '10px', minWidth: '15px' }}>📞</span>
							<span style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>
								Điện thoại: {shopInfo?.shop_phone || 'Đang cập nhật'}
							</span>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
							<span style={{ color: '#ee4d2d', marginRight: '10px', minWidth: '15px' }}>✉️</span>
							<span style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>
								Email: {shopInfo?.shop_email || 'Đang cập nhật'}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopFooter;