// ShopHeader.jsx
import React from 'react';

const ShopHeader = ({ activeCategory, onCategoryChange }) => {
	const categories = [
		'Đạo',
		'TẤT CẢ SẢN PHẨM',
		'Thời Trang Nam',
		'Phụ Kiện & Trang Sức',
		'Thời Trang Nữ',
		'Túi Ví Nữ',
		'Thêm'
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
				// borderRadius: '10px 10px 0 0',
				// margin: '15px 15px 0 15px',
				boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
				border: '1px solid #e8e8e8',
			}}>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					paddingRight: '80px',
					// backgroundColor: 'gray',
				}}>
					<div style={{
						position: 'relative',
						width: '80px',
						height: '80px',
						marginRight: '20px',
						borderRadius: '50%',
						overflow: 'hidden',
						border: '1px solid #f0f0f0',
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
					}}>
						<img
							src="https://down-cvs-vn.img.susercontent.com/26ced3b3074c7c0c2d53ec8065731bd9_tn.webp"
							alt="Microsoft"
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover'
							}}
						/>
					</div>

					<div>
						<h1 style={{
							margin: '0',
							fontSize: '26px',
							fontWeight: '700',
							letterSpacing: '0.5px',
							color: '#333'
						}}>KICHAELS</h1>
						<p style={{
							color: '#777',
							margin: '8px 0',
							fontSize: '14px',
							fontWeight: '500'
						}}>Online 4 phút trước</p>
						<div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>

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
								<span>+</span> Theo Dõi
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
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>74</span>
					</div>

					<div style={{ fontSize: '14px', fontWeight: '500' }}>
						<span style={{ color: '#777', marginRight: '5px' }}>Người Theo Dõi:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>28,2k</span>
					</div>

					<div style={{ fontSize: '14px', fontWeight: '500' }}>
						<span style={{ color: '#777', marginRight: '5px' }}>Đang Theo:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>0</span>
					</div>

					<div style={{ fontSize: '14px', fontWeight: '500' }}>
						<span style={{ color: '#777', marginRight: '5px' }}>Đánh Giá:</span>
						<span style={{ color: '#ee4d2d', fontWeight: '600' }}>4.4 (52,7k Đánh Giá)</span>
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

			{/* Navigation Bar - căn giữa */}
			<div style={{
				backgroundColor: 'white',
				margin: '0 0 15px',
				// borderRadius: '0 0 10px 10px',
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
					width: 'fit-content'
				}}>
					{categories.map((category, index) => (
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
								gap: '5px'
							}}
						>
							{category}
							{category === 'Thêm' && <span style={{ fontSize: '12px', marginLeft: '2px' }}>▼</span>}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ShopHeader;