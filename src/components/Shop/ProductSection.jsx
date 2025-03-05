import React from 'react';
import ProductCard from './ProductCard';

const ProductSection = () => {
	const products = [
		{
			id: 1,
			name: 'Thắt lưng nam ⚡ Giảm Giá Cực Sốc',
			image: '/images/belt1.jpg',
			price: 1000,
			originalPrice: 10000,
			discount: '90%',
			additionalDiscount: 'Giảm ₫1k',
			rating: 4.6,
			sold: 7000,
			badge: 'HOT SALE',
			freeShipping: true,
			isLiked: true
		},
		{
			id: 2,
			name: 'Thắt lưng nam ⚡ Giảm Giá Cực Sốc',
			image: '/images/belt2.jpg',
			price: 1000,
			originalPrice: 8333,
			discount: '88%',
			additionalDiscount: 'Giảm ₫1k',
			rating: 4.5,
			sold: 10100,
			badge: 'HOT SALE',
			freeShipping: true,
			isLiked: true
		},
		{
			id: 3,
			name: 'Áo giữ nhiệt nam ⚡ Giá Sốc ⚡ big size',
			image: '/images/thermal-shirt.jpg',
			price: 25678,
			originalPrice: 71328,
			discount: '64%',
			additionalDiscount: '10% Giảm',
			rating: 4.5,
			sold: 19400,
			badge: 'HOT SALE',
			freeShipping: true,
			isLiked: true
		},
		{
			id: 4,
			name: 'Quần lót nam❤️ Loại Đẹp ❤️ full size 35-90kg',
			image: '/images/underwear1.jpg',
			price: 1000,
			originalPrice: 10000,
			discount: '90%',
			additionalDiscount: 'Giảm ₫1k',
			rating: 4.3,
			sold: 10500,
			badge: 'HOT SALE',
			freeShipping: true,
			isLiked: true
		},
		{
			id: 5,
			name: 'Quần lót nam 🔥 Giá Cực Sốc 🔥 big size 35-115kg',
			image: '/images/underwear2.jpg',
			price: 1000,
			originalPrice: 10000,
			discount: '90%',
			additionalDiscount: 'Giảm ₫1k',
			rating: 4.4,
			sold: 62200,
			badge: 'HOT SALE',
			freeShipping: true,
			isLiked: true
		},
		{
			id: 6,
			name: 'Thắt lưng nam 🔥 Giá Sốc 🔥 cao cấp mặt khóa trượt',
			image: '/images/belt3.jpg',
			price: 1000,
			originalPrice: 10000,
			discount: '90%',
			additionalDiscount: 'Giảm ₫1k',
			rating: 4.5,
			sold: 595,
			badge: 'HOT SALE',
			freeShipping: true,
			isLiked: true
		},
	];

	return (
		<div style={{
			flex: 1,
			padding: '0 15px',
			marginTop: '20px'
		}}>
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '0 15px'
			}}>
				<h2 style={{
					fontSize: '18px',
					fontWeight: '600',
					margin: 0
				}}>GỢI Ý CHO BẠN</h2>
				<a href="#" style={{
					color: '#ee4d2d',
					textDecoration: 'none',
					fontSize: '14px'
				}}>Xem Tất Cả &gt;</a>
			</div>

			<div style={{
				display: 'flex',
				alignItems: 'center',
				backgroundColor: 'white',
				padding: '15px',
				marginTop: '10px'
			}}>
				<div style={{
					display: 'flex',
					alignItems: 'center'
				}}>
					<div style={{
						padding: '8px 15px',
						cursor: 'pointer',
						fontSize: '14px',
						marginRight: '5px'
					}}>Sắp xếp theo</div>

					<div style={{
						padding: '8px 15px',
						cursor: 'pointer',
						fontSize: '14px',
						marginRight: '5px',
						backgroundColor: '#ee4d2d',
						color: 'white',
						borderRadius: '4px'
					}}>Phổ Biến</div>

					<div style={{
						padding: '8px 15px',
						cursor: 'pointer',
						fontSize: '14px',
						marginRight: '5px',
						borderRadius: '4px'
					}}>Mới Nhất</div>

					<div style={{
						padding: '8px 15px',
						cursor: 'pointer',
						fontSize: '14px',
						marginRight: '5px',
						borderRadius: '4px'
					}}>Bán Chạy</div>

					<div style={{
						padding: '8px 15px',
						cursor: 'pointer',
						fontSize: '14px',
						marginRight: '5px',
						borderRadius: '4px',
						display: 'flex',
						alignItems: 'center'
					}}>
						Giá <i style={{ marginLeft: '5px' }}>▼</i>
					</div>
				</div>

				<div style={{
					marginLeft: 'auto',
					display: 'flex',
					alignItems: 'center'
				}}>
					1/2
					<button style={{
						backgroundColor: 'white',
						border: '1px solid #ccc',
						borderRadius: '4px',
						padding: '5px 10px',
						marginLeft: '10px',
						cursor: 'pointer'
					}}>&lt;</button>
					<button style={{
						backgroundColor: 'white',
						border: '1px solid #ccc',
						borderRadius: '4px',
						padding: '5px 10px',
						marginLeft: '10px',
						cursor: 'pointer'
					}}>&gt;</button>
				</div>
			</div>

			<div style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(5, 1fr)',
				gridGap: '10px',
				marginTop: '15px'
			}}>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default ProductSection;