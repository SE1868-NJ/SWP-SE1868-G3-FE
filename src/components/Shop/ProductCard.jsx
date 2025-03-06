import React from 'react';
import { Card } from 'react-bootstrap';

const ProductCard = ({ product }) => {
	const {
		id,
		name,
		image,
		price,
		discount,
		rating,
		sold,
		freeShipping
	} = product;

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
					src={image}
					style={{
						height: '180px',
						objectFit: 'cover',
						borderTopLeftRadius: '8px',
						borderTopRightRadius: '8px',
						transition: 'transform 0.3s ease'
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
					{name}
				</div>

				<div className='d-flex align-items-center gap-2 mb-1'>
					<span
						style={{
							color: '#ee4d2d',
							fontSize: '16px',
							fontWeight: '700'
						}}
					>
						₫{price.toLocaleString()}
					</span>

					{discount && (
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
							-{discount}
						</span>
					)}
				</div>

				<div className='d-flex justify-content-between mt-2'>
					<div className='d-flex align-items-center gap-1' style={{ fontSize: '13px', color: '#777' }}>
						<span style={{ color: '#ffc107', fontWeight: '700' }}>★</span>
						<span>{rating}</span>
					</div>
					<div style={{ fontSize: '13px', color: '#777' }}>
						Đã bán {sold.toLocaleString()}
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;