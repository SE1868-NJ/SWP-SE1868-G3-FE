import React from 'react';

const Banner = ({ banners = [] }) => {
	// URL thật để thay thế, đảm bảo URL này tồn tại
	const DEFAULT_IMAGE = "https://placehold.co/1200x400/f5f5f5/cccccc?text=Shop+Banner";

	// Kiểm tra xem banners có dữ liệu hợp lệ không
	const hasBanners = Array.isArray(banners) && banners.length > 0 && banners[0]?.image_url;

	return (
		<div style={{
			margin: '15px',
			display: 'flex',
			flexDirection: 'column',
			gap: '20px'
		}}>
			<div style={{
				position: 'relative',
				borderRadius: '10px',
				overflow: 'hidden',
				boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
				border: '1px solid #e8e8e8'
			}}>
				{/* Sử dụng hình ảnh cứng tạm thời */}
				<div style={{
					width: '100%',
					height: '515px',
					backgroundColor: '#f5f5f5',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: '#888',
					fontSize: '20px',
					fontWeight: 'bold'
				}}>
					{hasBanners ? (
						<img
							src={DEFAULT_IMAGE} // Tạm thời sử dụng ảnh mặc định
							alt="Shop Banner"
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover'
							}}
						/>
					) : (
						"Khuyến mãi tháng 3 - Mua gia dụng Samsung nhận ưu đãi gấp đôi"
					)}
				</div>

				<div style={{
					position: 'absolute',
					bottom: '20px',
					left: '50%',
					transform: 'translateX(-50%)',
					display: 'flex',
					gap: '10px'
				}}>
					<span style={{
						width: '10px',
						height: '10px',
						borderRadius: '50%',
						backgroundColor: '#ee4d2d',
						display: 'block',
						border: '1px solid rgba(255, 255, 255, 0.5)'
					}}></span>
					<span style={{
						width: '10px',
						height: '10px',
						borderRadius: '50%',
						backgroundColor: 'rgba(255, 255, 255, 0.7)',
						display: 'block',
						border: '1px solid rgba(255, 255, 255, 0.5)'
					}}></span>
					<span style={{
						width: '10px',
						height: '10px',
						borderRadius: '50%',
						backgroundColor: 'rgba(255, 255, 255, 0.7)',
						display: 'block',
						border: '1px solid rgba(255, 255, 255, 0.5)'
					}}></span>
				</div>
			</div>

			{/* Phần ưu đãi */}
			<div style={{ display: 'flex', gap: '20px' }}>
				{[
					{ title: 'Giảm 10%', desc: 'Đơn Tối Thiểu ₫49k Giảm tối đa ₫20k', exp: 'HSD: 14.03.2025' },
					{ title: 'Giảm ₫6k', desc: 'Đơn Tối Thiểu ₫0', badge: 'Sản phẩm nhất định', exp: 'HSD: 04.04.2025' },
					{ title: 'Giảm ₫1k', desc: 'Đơn Tối Thiểu ₫0', badge: 'Sản phẩm nhất định', exp: 'HSD: 30.05.2025' }
				].map((promo, index) => (
					<div key={index} style={{
						flex: '1',
						backgroundColor: '#fff6f6',
						border: '2px solid #ffcdd2',
						borderRadius: '10px',
						padding: '18px',
						display: 'flex',
						justifyContent: 'space-between',
						boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
					}}>
						<div>
							<div style={{
								color: '#ee4d2d',
								fontWeight: '700',
								fontSize: '18px'
							}}>{promo.title}</div>
							<div style={{
								marginTop: '10px',
								fontSize: '15px',
								fontWeight: '500'
							}}>{promo.desc}</div>
							{promo.badge && (
								<div style={{
									display: 'inline-block',
									backgroundColor: '#f5f5f5',
									borderRadius: '5px',
									padding: '4px 10px',
									fontSize: '13px',
									marginTop: '10px',
									border: '1px solid #e0e0e0',
									fontWeight: '600'
								}}>{promo.badge}</div>
							)}
							<div style={{
								color: '#777',
								fontSize: '13px',
								marginTop: '10px',
								fontWeight: '500'
							}}>{promo.exp}</div>
						</div>
						<button style={{
							backgroundColor: '#ee4d2d',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							padding: '10px 25px',
							alignSelf: 'center',
							cursor: 'pointer',
							fontWeight: '600',
							transition: 'all 0.2s ease',
							boxShadow: '0 2px 4px rgba(238, 77, 45, 0.3)',
							fontSize: '15px'
						}}>Lưu</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Banner;