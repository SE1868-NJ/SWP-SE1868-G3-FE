import React, { useState, useEffect } from 'react';

const ShopHeader = ({ activeCategory, onCategoryChange, shopInfo, categories = [] }) => {
	const [isFollowing, setIsFollowing] = useState(false);

	// Đảm bảo shopInfo luôn có dữ liệu hợp lệ
	const safeShopInfo = shopInfo || {
		shop_name: "KICHAELS",
		follower_count: 0,
		product_count: 0,
		average_rating: 0,
		rating_count: 0
	};

	const handleToggleFollow = () => {
		setIsFollowing(!isFollowing);
		// Thêm xử lý theo dõi/hủy theo dõi ở đây nếu cần
	};

	// Xây dựng danh mục từ dữ liệu API
	const allProductsOption = 'TẤT CẢ SẢN PHẨM';

	// Hiển thị tất cả danh mục, không giới hạn số lượng, không có mục "Thêm"
	const visibleCategories = categories.length > 0
		? [allProductsOption, ...categories.map(cat => cat.name)]
		: [
			allProductsOption,
			'Thời Trang Nam',
			'Thời Trang Nữ',
			'Phụ Kiện & Trang Sức Nữ',
			'Túi Ví Nữ',
			'Balo & Túi Ví Nam',
			'Thể Thao & Du Lịch',
			'Gia Dụng Samsung'
		];

	const scrollToCategory = (category) => {
		onCategoryChange(category);

		// Scroll xuống phần category section
		const categorySection = document.getElementById('category-section');
		if (categorySection) {
			categorySection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div>
			{/* Header */}
			<div style={{
				display: 'flex',
				padding: '25px',
				backgroundColor: 'white',
				boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
				border: '1px solid #e8e8e8',
			}}>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					paddingRight: '80px',
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
						{safeShopInfo.shop_logo ? (
							<img
								src={safeShopInfo.shop_logo}
								alt={`${safeShopInfo.shop_name} logo`}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover'
								}}
							/>
						) : (
							<span>{safeShopInfo.shop_name?.charAt(0) || 'K'}</span>
						)}
					</div>

					<div>
						<h1 style={{
							margin: '0',
							fontSize: '26px',
							fontWeight: '700',
							letterSpacing: '0.5px',
							color: '#333'
						}}>{safeShopInfo.shop_name}</h1>
						<p style={{
							color: '#777',
							margin: '8px 0',
							fontSize: '14px',
							fontWeight: '500'
						}}>Online 4 phút trước</p>
						<div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>

							<button
								onClick={handleToggleFollow}
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
					marginLeft: '25px',
					display: 'grid',
					gridTemplateColumns: 'repeat(2, 1fr)',
					gridGap: '18px',
					padding: '10px 0 0 15px',
					borderLeft: '1px solid #f0f0f0',
				}}>
					<div style={{ fontSize: '14px', fontWeight: '500' }}>
						<span style={{ color: '#777', marginRight: '5px' }}>Sản Phẩm:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>{safeShopInfo.product_count}</span>
					</div>

					<div style={{ fontSize: '14px', fontWeight: '500' }}>
						<span style={{ color: '#777', marginRight: '5px' }}>Người Theo Dõi:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>{safeShopInfo.follower_count}</span>
					</div>

					<div style={{ fontSize: '14px', fontWeight: '500' }}>
						<span style={{ color: '#777', marginRight: '5px' }}>Đang Theo:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>0</span>
					</div>

					<div style={{ fontSize: '14px', fontWeight: '500' }}>
						<span style={{ color: '#777', marginRight: '5px' }}>Đánh Giá:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>
							{safeShopInfo.average_rating} ({safeShopInfo.rating_count} Đánh Giá)
						</span>
					</div>

					<div style={{ fontSize: '14px', fontWeight: '500' }}>
						<span style={{ color: '#777', marginRight: '5px' }}>Tỉ Lệ Phản Hồi Chat:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>98% (Trong Vài Giờ)</span>
					</div>

					<div style={{ fontSize: '14px', fontWeight: '500' }}>
						<span style={{ color: '#777', marginRight: '5px' }}>Tham Gia:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>5 Năm Trước</span>
					</div>
				</div>
			</div>

			{/* Navigation Bar - căn giữa và thêm thanh cuộn ngang nếu cần */}
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
					justifyContent: 'flex-start',
					width: '100%',
					maxWidth: '1200px',
					overflowX: 'auto',
					WebkitOverflowScrolling: 'touch',
					scrollbarWidth: 'none', // Firefox
					msOverflowStyle: 'none', // IE/Edge
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
								whiteSpace: 'nowrap' // Không cho phép xuống dòng
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