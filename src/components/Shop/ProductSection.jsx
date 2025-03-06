import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductSection = ({ category }) => {
	const [sortBy, setSortBy] = useState('Phổ Biến');
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [showPriceDropdown, setShowPriceDropdown] = useState(false);
	const [priceDirection, setPriceDirection] = useState(''); // 'asc' hoặc 'desc'

	// Base product data
	const allProducts = [
		{
			id: 1,
			name: 'Thắt lưng nam',
			image: 'https://down-vn.img.susercontent.com/file/vn-11134258-7ra0g-m6muwp6dhg0obe',
			price: 1000,
			originalPrice: 10000,
			discount: '90%',
			additionalDiscount: 'Giảm ₫1k',
			rating: 4.6,
			sold: 7000,
			freeShipping: true,
			isLiked: true,
			category: 'Thời Trang Nam'
		},
		{
			id: 2,
			name: 'Thắt lưng nam',
			image: 'https://th.bing.com/th/id/OIP.dX_I3L5xTBHNmmqBJbYuHgHaHr?w=187&h=194&c=7&r=0&o=5&dpr=2&pid=1.7',
			price: 1000,
			originalPrice: 8333,
			discount: '88%',
			additionalDiscount: 'Giảm ₫1k',
			rating: 4.5,
			sold: 10100,
			freeShipping: true,
			isLiked: true,
			category: 'Thời Trang Nam'
		},
		{
			id: 3,
			name: 'Áo giữ nhiệt nam',
			image: 'https://down-vn.img.susercontent.com/file/c1153dd0a2c84ab5aa12a4f6c12b394e',
			price: 25678,
			originalPrice: 71328,
			discount: '64%',
			additionalDiscount: '10% Giảm',
			rating: 4.5,
			sold: 19400,
			freeShipping: true,
			isLiked: true,
			category: 'Thời Trang Nam'
		},
		{
			id: 4,
			name: 'Quần lót nam',
			image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgthvt8izu4n11',
			price: 1000,
			originalPrice: 10000,
			discount: '90%',
			additionalDiscount: 'Giảm ₫1k',
			rating: 4.3,
			sold: 10500,
			freeShipping: true,
			isLiked: true,
			category: 'Thời Trang Nam'
		},
		{
			id: 5,
			name: 'Quần lót nam',
			image: 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-3en6qlttygov13',
			price: 1000,
			originalPrice: 10000,
			discount: '90%',
			additionalDiscount: 'Giảm ₫1k',
			rating: 4.4,
			sold: 62200,
			freeShipping: true,
			isLiked: true,
			category: 'Thời Trang Nam'
		},
		{
			id: 6,
			name: 'Túi xách nữ đẹp chất liệu da cao cấp',
			image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lf4njgj7emwdb3',
			price: 159000,
			originalPrice: 300000,
			discount: '47%',
			additionalDiscount: 'Giảm ₫15k',
			rating: 4.8,
			sold: 3250,
			freeShipping: true,
			isLiked: false,
			category: 'Túi Ví Nữ'
		},
		{
			id: 7,
			name: 'Đầm dự tiệc nữ thời trang cao cấp',
			image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lexj1lrp4bkx6d',
			price: 245000,
			originalPrice: 450000,
			discount: '46%',
			additionalDiscount: '',
			rating: 4.7,
			sold: 1870,
			freeShipping: true,
			isLiked: true,
			category: 'Thời Trang Nữ'
		},
		{
			id: 8,
			name: 'Balo du lịch đi phượt chống nước',
			image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ll74bw1mtmxq58',
			price: 189000,
			originalPrice: 350000,
			discount: '46%',
			additionalDiscount: 'Giảm ₫20k',
			rating: 4.9,
			sold: 2340,
			freeShipping: true,
			isLiked: false,
			category: 'Thể Thao & Du Lịch'
		}
	];

	// Filter products based on selected category
	useEffect(() => {
		if (category === 'TẤT CẢ SẢN PHẨM' || category === 'Đạo' || category === 'Sản Phẩm') {
			setFilteredProducts(allProducts);
		} else {
			setFilteredProducts(allProducts.filter(product => product.category === category));
		}
	}, [category]);

	// Sorting options
	const handleSort = (sort) => {

		if (sort === 'Giá') {
			setShowPriceDropdown(!showPriceDropdown);
			if (sortBy !== 'Giá') {
				setSortBy(sort);
			}
			return;
		}

		// Ẩn dropdown nếu chọn option khác
		setShowPriceDropdown(false);
		setSortBy(sort);
		let sorted = [...filteredProducts];

		switch (sort) {
			case 'Phổ Biến':
				// Already sorted by popularity
				break;
			case 'Mới Nhất':
				// Sort by id (newest first)
				sorted = sorted.sort((a, b) => b.id - a.id);
				break;
			case 'Bán Chạy':
				// Sort by sold items
				sorted = sorted.sort((a, b) => b.sold - a.sold);
				break;
			default:
				break;
		}

		setFilteredProducts(sorted);
	};

	// Xử lý khi chọn cách sắp xếp giá
	const handlePriceSort = (direction) => {
		setPriceDirection(direction);
		setSortBy('Giá');
		setShowPriceDropdown(false);

		let sorted = [...filteredProducts];

		if (direction === 'asc') {
			sorted = sorted.sort((a, b) => a.price - b.price);
		} else if (direction === 'desc') {
			sorted = sorted.sort((a, b) => b.price - a.price);
		}

		setFilteredProducts(sorted);
	};

	// Hiển thị icon tương ứng với hướng sắp xếp giá
	const getPriceIcon = () => {
		if (priceDirection === 'asc') return '▲';
		if (priceDirection === 'desc') return '▼';
		return '◢';
	};

	return (
		<div style={{
			flex: 1,
			backgroundColor: 'white',
			borderRadius: '10px',
			padding: '20px',
			boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
			border: '1px solid #e8e8e8'
		}}>


			<div style={{
				display: 'flex',
				alignItems: 'center',
				borderBottom: '2px solid #f0f0f0',
				paddingBottom: '18px',
				marginBottom: '20px'
			}}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
					<div style={{
						padding: '8px 15px',
						cursor: 'pointer',
						fontSize: '15px',
						color: '#777',
						fontWeight: '600'
					}}>Sắp xếp theo</div>

					{['Phổ Biến', 'Mới Nhất', 'Bán Chạy'].map((option) => (
						<div
							key={option}
							onClick={() => handleSort(option)}
							style={{
								padding: '10px 18px',
								cursor: 'pointer',
								fontSize: '14px',
								backgroundColor: sortBy === option ? '#ee4d2d' : '#f5f5f5',
								color: sortBy === option ? 'white' : '#333',
								borderRadius: '5px',
								display: 'flex',
								alignItems: 'center',
								gap: '5px',
								transition: 'all 0.2s ease',
								fontWeight: sortBy === option ? '600' : '500',
								border: sortBy === option ? 'none' : '1px solid #e0e0e0'
							}}
						>
							{option}
						</div>
					))}
					{/* Button Giá với dropdown */}
					<div style={{ position: 'relative' }}>
						<div
							onClick={() => handleSort('Giá')}
							style={{
								padding: '10px 18px',
								cursor: 'pointer',
								fontSize: '14px',
								backgroundColor: sortBy === 'Giá' ? '#ee4d2d' : '#f5f5f5',
								color: sortBy === 'Giá' ? 'white' : '#333',
								borderRadius: '5px',
								display: 'flex',
								alignItems: 'center',
								gap: '5px',
								transition: 'all 0.2s ease',
								fontWeight: sortBy === 'Giá' ? '600' : '500',
								border: sortBy === 'Giá' ? 'none' : '1px solid #e0e0e0'
							}}
						>
							Giá <span style={{ fontSize: '12px', marginLeft: '2px' }}>{getPriceIcon()}</span>
						</div>

						{/* Dropdown cho Giá */}
						{showPriceDropdown && (
							<div style={{
								position: 'absolute',
								top: '100%',
								left: 0,
								marginTop: '5px',
								backgroundColor: 'white',
								border: '1px solid #e0e0e0',
								borderRadius: '5px',
								boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
								zIndex: 10,
								width: '150px'
							}}>
								<div
									onClick={() => handlePriceSort('asc')}
									style={{
										padding: '10px 15px',
										cursor: 'pointer',
										fontSize: '14px',
										borderBottom: '1px solid #f0f0f0',
										color: '#333',
										backgroundColor: priceDirection === 'asc' ? '#f8f8f8' : 'white',
										transition: 'background-color 0.2s ease'
									}}
									onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f8f8'}
									onMouseLeave={(e) => e.target.style.backgroundColor = priceDirection === 'asc' ? '#f8f8f8' : 'white'}
								>
									Giá: Thấp đến Cao
								</div>
								<div
									onClick={() => handlePriceSort('desc')}
									style={{
										padding: '10px 15px',
										cursor: 'pointer',
										fontSize: '14px',
										color: '#333',
										backgroundColor: priceDirection === 'desc' ? '#f8f8f8' : 'white',
										transition: 'background-color 0.2s ease'
									}}
									onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f8f8'}
									onMouseLeave={(e) => e.target.style.backgroundColor = priceDirection === 'desc' ? '#f8f8f8' : 'white'}
								>
									Giá: Cao đến Thấp
								</div>
							</div>
						)}
					</div>
				</div>

				<div style={{
					marginLeft: 'auto',
					display: 'flex',
					alignItems: 'center',
					gap: '12px'
				}}>
					<span style={{ fontSize: '14px', color: '#777', fontWeight: '500' }}>1/2</span>
					<button style={{
						width: '32px',
						height: '32px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#f5f5f5',
						border: '1px solid #e0e0e0',
						borderRadius: '5px',
						cursor: 'pointer',
						fontWeight: '600'
					}}>‹</button>
					<button style={{
						width: '32px',
						height: '32px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#f5f5f5',
						border: '1px solid #e0e0e0',
						borderRadius: '5px',
						cursor: 'pointer',
						fontWeight: '600'
					}}>›</button>
				</div>
			</div>

			<div style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(5, 1fr)',
				gap: '18px'
			}}>
				{filteredProducts.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default ProductSection;