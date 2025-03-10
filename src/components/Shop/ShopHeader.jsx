import React, { useState } from 'react';

const ShopHeader = ({ activeCategory, onCategoryChange, shopInfo, categories = [] }) => {
	const [isFollowing, setIsFollowing] = useState(false);

	const allProductsOption = 'TẤT CẢ SẢN PHẨM';
	const visibleCategories = [allProductsOption, ...categories.map(cat => cat.name)];

	const scrollToCategory = (category) => {
		onCategoryChange(category);
		const categorySection = document.getElementById('category-section');
		if (categorySection) {
			categorySection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div>
			<div style={{
				display: 'flex',
				padding: '25px',
				backgroundColor: 'white',
				boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
				border: '1px solid #e8e8e8',
				alignItems: 'center'
			}}>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					paddingRight: '45px',
					paddingLeft: '90px',
				}}>
					<div style={{
						position: 'relative',
						width: '80px',
						height: '80px',
						marginRight: '20px',
						borderRadius: '50%',
						overflow: 'hidden',
						border: '1px solid #f0f0f0',
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
						backgroundColor: '#f0f0f0',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						color: '#888'
					}}>
						{shopInfo.shop_logo ? (
							<img
								src={shopInfo.shop_logo}
								alt={`${shopInfo.shop_name} logo`}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover'
								}}
							/>
						) : (
							<span>{shopInfo.shop_name.charAt(0)}</span>
						)}
					</div>

					<div>
						<h1 style={{
							margin: '0',
							fontSize: '26px',
							fontWeight: '700',
							letterSpacing: '0.5px',
							color: '#333'
						}}>{shopInfo.shop_name}</h1>
						<p style={{
							color: '#777',
							margin: '8px 0',
							fontSize: '14px',
							fontWeight: '500'
						}}>Online 4 phút trước</p>
						<div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
							<button
								style={{
									padding: '8px 15px',
									borderRadius: '5px',
									cursor: 'pointer',
									fontSize: '13px',
									border: '1px solid #ccc',
									backgroundColor: isFollowing ? '#f5f5f5' : 'white',
									color: '#333',
									display: 'flex',
									alignItems: 'center',
									gap: '5px',
									transition: 'all 0.2s ease',
									fontWeight: '600'
								}}
							>
								<span>{isFollowing ? '✓' : '+'}</span> {isFollowing ? 'Đã Theo Dõi' : 'Theo Dõi'}
							</button>

							<button style={{
								padding: '8px 15px',
								borderRadius: '5px',
								cursor: 'pointer',
								fontSize: '13px',
								border: '1px solid #ccc',
								backgroundColor: 'white',
								color: '#333',
								display: 'flex',
								alignItems: 'center',
								gap: '5px',
								transition: 'all 0.2s ease',
								fontWeight: '600'
							}}>
								<span>💬</span> Chat
							</button>
						</div>
					</div>
				</div>

				<div style={{
					height: '80px',
					width: '1px',
					backgroundColor: '#e0e0e0',
					marginRight: '20px'
				}} />

				<div style={{
					display: 'flex',
					flexDirection: 'column',
					marginRight: '20px',
					gap: '10px'
				}}>
					<div style={{
						fontSize: '14px',
						fontWeight: '500',
						display: 'flex',
						alignItems: 'center'
					}}>
						<span style={{ color: '#777', marginRight: '5px' }}>Sản Phẩm:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>{shopInfo.product_count}</span>
					</div>

					<div style={{
						fontSize: '14px',
						fontWeight: '500',
						display: 'flex',
						alignItems: 'center'
					}}>
						<span style={{ color: '#777', marginRight: '5px' }}>Đánh Giá:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>
							{shopInfo.average_rating} ({shopInfo.rating_count} Đánh Giá)
						</span>
					</div>
				</div>

				<div style={{
					height: '80px',
					width: '1px',
					backgroundColor: '#e0e0e0',
					marginRight: '20px'
				}} />

				<div style={{
					fontSize: '14px',
					color: '#555',
					lineHeight: '1.6'
				}}>
					<h4 style={{
						fontSize: '16px',
						fontWeight: '700',
						marginBottom: '10px',
						color: '#333'
					}}>
						Giới Thiệu Cửa Hàng:
					</h4>
					{shopInfo.shop_description || 'Cửa hàng thời trang và gia dụng chất lượng cao'}
				</div>
			</div>

			<div style={{
				backgroundColor: 'white',
				margin: '0 0 15px',
				boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
				overflow: 'hidden',
				border: '1px solid #e8e8e8',
				borderTop: 'none',
				display: 'flex',
				justifyContent: 'center'
			}}>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					width: '100%',
					maxWidth: '1200px',
					overflowX: 'auto',
					WebkitOverflowScrolling: 'touch',
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}>
					{visibleCategories.map((category, index) => (
						<div
							key={index}
							onClick={() => scrollToCategory(category)}
							style={{
								padding: '18px 22px',
								cursor: 'pointer',
								fontSize: '14px',
								color: activeCategory === category ? '#ee4d2d' : '#333',
								borderBottom: activeCategory === category ? '3px solid #ee4d2d' : 'none',
								fontWeight: activeCategory === category ? '700' : '600',
								transition: 'all 0.2s ease',
								position: 'relative',
								display: 'flex',
								alignItems: 'center',
								whiteSpace: 'nowrap'
							}}
						>
							{category}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ShopHeader;