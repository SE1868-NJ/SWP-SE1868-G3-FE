import React from 'react';

const ProductCard = ({ product }) => {
	const {
		name,
		image,
		price,
		originalPrice,
		discount,
		additionalDiscount,
		rating,
		sold,
		badge,
		freeShipping,
		isLiked
	} = product;

	return (
		<div style={{
			backgroundColor: 'white',
			borderRadius: '4px',
			overflow: 'hidden',
			boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
		}}>
			<div style={{
				position: 'relative',
				height: '200px'
			}}>
				<img src={image} alt={name} style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover'
				}} />
				{badge && (
					<div style={{
						position: 'absolute',
						top: '10px',
						left: '10px',
						backgroundColor: '#ee4d2d',
						color: 'white',
						padding: '3px 8px',
						borderRadius: '4px',
						fontSize: '12px'
					}}>{badge}</div>
				)}
				{freeShipping && (
					<div style={{
						position: 'absolute',
						bottom: '10px',
						left: '10px',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						color: 'white',
						padding: '3px 8px',
						borderRadius: '4px',
						fontSize: '12px'
					}}>MIỄN PHÍ VẬN CHUYỂN</div>
				)}
			</div>
			<div style={{ padding: '10px' }}>
				<div style={{
					fontSize: '14px',
					marginBottom: '5px',
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden'
				}}>{name}</div>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					marginBottom: '5px'
				}}>
					<div style={{
						color: '#ee4d2d',
						fontSize: '16px',
						fontWeight: '600',
						marginRight: '5px'
					}}>₫{price.toLocaleString()}</div>
					{discount && (
						<div style={{
							backgroundColor: '#ffeee8',
							color: '#ee4d2d',
							padding: '2px 4px',
							borderRadius: '4px',
							fontSize: '12px'
						}}>-{discount}</div>
					)}
				</div>
				{additionalDiscount && (
					<div style={{
						display: 'inline-block',
						backgroundColor: '#ffeee8',
						color: '#ee4d2d',
						padding: '2px 4px',
						borderRadius: '4px',
						fontSize: '12px',
						marginBottom: '5px'
					}}>{additionalDiscount}</div>
				)}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: '12px',
					color: '#888'
				}}>
					<div>
						<span style={{ color: '#ffc107', marginRight: '2px' }}>★</span>
						{rating}
					</div>
					<div>Đã bán {sold.toLocaleString()}</div>
				</div>
				<div style={{ marginTop: '5px' }}>
					{isLiked && (
						<div style={{
							display: 'inline-block',
							backgroundColor: '#ffeee8',
							color: '#ee4d2d',
							padding: '2px 4px',
							borderRadius: '4px',
							fontSize: '12px'
						}}>Yêu thích</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;