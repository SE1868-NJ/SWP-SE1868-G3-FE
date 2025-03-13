import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { shopService } from '../../services/shopService';

const ProductSection = ({ category, shopId }) => {
	const [sortBy, setSortBy] = useState('Phổ Biến');
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showPriceDropdown, setShowPriceDropdown] = useState(false);
	const [priceDirection, setPriceDirection] = useState('');
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const respond = await shopService.getProductsByShopAndCategory(shopId);
				if (respond?.status === "success" && respond?.data?.products && Array.isArray(respond.data.products)) {
					let filteredProducts = respond.data.products;
					if (category && category !== 'TẤT CẢ SẢN PHẨM') {
						filteredProducts = respond.data.products.filter(product =>
							product.category?.name === category
						);
					}
					setProducts(filteredProducts);
					setTotalPages(respond.data.pagination?.totalPages || 1);
				} else {
					setProducts([]);
				}
			} catch (err) {
				setProducts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [shopId, category]);

	const handleSort = (sort) => {
		if (sort === 'Giá') {
			setShowPriceDropdown(!showPriceDropdown);
			if (sortBy !== 'Giá') {
				setSortBy(sort);
			}
			return;
		}

		setShowPriceDropdown(false);
		setSortBy(sort);

		const sortedProducts = [...products];
		switch (sort) {
			case 'Phổ Biến':
				sortedProducts.sort((a, b) => b.average_rating - a.average_rating);
				break;
			case 'Mới Nhất':
				sortedProducts.sort((a, b) => b.id - a.id);
				break;
			case 'Bán Chạy':
				sortedProducts.sort((a, b) => b.sold_count - a.sold_count);
				break;
			default:
				break;
		}

		setProducts(sortedProducts);
	};

	const handlePriceSort = (direction) => {
		setPriceDirection(direction);
		setSortBy('Giá');
		setShowPriceDropdown(false);

		const sortedProducts = [...products];
		if (direction === 'asc') {
			sortedProducts.sort((a, b) => parseFloat(a.sale_price) - parseFloat(b.sale_price));
		} else {
			sortedProducts.sort((a, b) => parseFloat(b.sale_price) - parseFloat(a.sale_price));
		}
		setProducts(sortedProducts);
	};

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
					{/* Xu ly phan trang */}
					<span style={{ fontSize: '14px', color: '#777', fontWeight: '500' }}>
						1/{totalPages}
					</span>
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
						fontWeight: '600',
						opacity: 0.5
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
						fontWeight: '600',
						opacity: 0.5
					}}>›</button>
				</div>
			</div>

			{loading ? (
				<div style={{ textAlign: 'center', padding: '40px 0' }}>
					<p>Đang tải sản phẩm...</p>
				</div>
			) : products.length === 0 ? (
				<div style={{ textAlign: 'center', padding: '40px 0' }}>
					<p>Không tìm thấy sản phẩm nào</p>
				</div>
			) : (
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(5, 1fr)',
					gap: '18px'
				}}>
					{products.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};

export default ProductSection;