// ProductCard.jsx - Phiên bản hoàn chỉnh
import React from 'react';
import { Card } from 'react-bootstrap';

const ProductCard = ({ product }) => {
	// Kiểm tra và sử dụng tên trường chính xác từ API
	const {
		id,
		name,
		product_name,
		image,
		image_url,
		price,
		sale_price,
		originalPrice,
		import_price,
		discount,
		discount_percent,
		additionalDiscount,
		rating,
		average_rating,
		sold,
		sold_count,
		freeShipping = true // Mặc định có miễn phí vận chuyển
	} = product;

	// Xử lý dữ liệu sản phẩm từ API
	const displayName = product_name || name || "Sản phẩm";
	const displayImage = image_url || image || "https://placehold.co/300x300/e74c3c/white?text=No+Image";
	const displayPrice = sale_price || price || 0;
	const displayOriginalPrice = import_price || originalPrice || 0;

	// Xử lý discount
	let displayDiscount = '';
	if (discount) {
		// Nếu đã có discount từ prop
		displayDiscount = discount;
	} else if (discount_percent && discount_percent > 0) {
		// Nếu có discount_percent từ API và là số dương
		displayDiscount = `${Math.abs(discount_percent)}%`;
	} else if (displayOriginalPrice && displayPrice && displayOriginalPrice > displayPrice) {
		// Tính discount từ giá gốc và giá bán
		const discountPercent = Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100);
		if (discountPercent > 0) {
			displayDiscount = `${discountPercent}%`;
		}
	}

	// Xử lý rating và số lượng đã bán
	const displayRating = average_rating || rating || 0;
	const displaySold = sold_count || sold || 0;

	// Format số để hiển thị
	const formatNumber = (num) => {
		return new Intl.NumberFormat('vi-VN').format(parseFloat(num));
	};

	return (
		<Card
			className='h-100 border-0 shadow-sm'
			style={{
				transition: 'transform 0.2s ease, box-shadow 0.2s ease',
				borderRadius: '8px',
				overflow: 'hidden',
				maxWidth: '100%'
			}}
			onMouseOver={(e) => {
				e.currentTarget.style.transform = 'translateY(-3px)';
				e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
			}}
			onMouseOut={(e) => {
				e.currentTarget.style.transform = 'none';
				e.currentTarget.style.boxShadow = '';
			}}
		>
			<div className='position-relative'>
				<Card.Img
					variant='top'
					src={displayImage}
					style={{
						height: '180px',
						objectFit: 'cover',
						borderTopLeftRadius: '8px',
						borderTopRightRadius: '8px',
						transition: 'transform 0.3s ease',
						backgroundColor: '#e74c3c'
					}}
					onError={(e) => {
						// Fallback khi hình ảnh lỗi
						e.target.src = `https://placehold.co/300x300/e74c3c/white?text=${encodeURIComponent(displayName.substring(0, 15))}`;
					}}
					onMouseOver={(e) => {
						e.currentTarget.style.transform = 'scale(1.05)';
					}}
					onMouseOut={(e) => {
						e.currentTarget.style.transform = 'none';
					}}
				/>

				{freeShipping && (
					<div
						className='position-absolute bottom-0 start-0 m-2'
						style={{
							backgroundColor: 'rgba(0, 0, 0, 0.7)',
							color: 'white',
							padding: '4px 8px',
							borderRadius: '4px',
							fontSize: '11px',
							fontWeight: '600',
							backdropFilter: 'blur(2px)'
						}}
					>
						MIỄN PHÍ VẬN CHUYỂN
					</div>
				)}
			</div>

			<Card.Body className='p-3'>
				<div
					style={{
						fontSize: '18px',
						lineHeight: '1.4',
						height: '50px',
						overflow: 'hidden',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						marginBottom: '2px',
						color: '#333',
						fontWeight: '500'
					}}
				>
					{displayName}
				</div>

				<div className='d-flex align-items-center gap-2 mb-1'>
					<span
						style={{
							color: '#ee4d2d',
							fontSize: '16px',
							fontWeight: '700'
						}}
					>
						₫{formatNumber(displayPrice)}
					</span>

					{displayDiscount && (
						<span
							style={{
								backgroundColor: '#ffeee8',
								color: '#ee4d2d',
								padding: '2px 5px',
								borderRadius: '4px',
								fontSize: '13px',
								fontWeight: '600',
								border: '1px solid #ffdacf'
							}}
						>
							-{displayDiscount}
						</span>
					)}
				</div>

				<div className='d-flex justify-content-between mt-2'>
					<div className='d-flex align-items-center gap-1' style={{ fontSize: '13px', color: '#777' }}>
						<span style={{ color: '#ffc107', fontWeight: '700' }}>★</span>
						<span>{typeof displayRating === 'number' ? displayRating.toFixed(1) : parseFloat(displayRating).toFixed(1)}</span>
					</div>
					<div style={{ fontSize: '13px', color: '#777' }}>
						Đã bán {formatNumber(displaySold)}
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;