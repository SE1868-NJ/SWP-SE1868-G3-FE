import React, { useState } from 'react';
import ShopHeader from '../components/Shop/ShopHeader';
import Banner from '../components/Shop/Banner';
import ShopFooter from '../components/Shop/ShopFooter';
import CategorySection from '../components/Shop/CategorySection';
import ProductSection from '../components/Shop/ProductSection';

function Shop() {
	const [activeCategory, setActiveCategory] = useState('TẤT CẢ SẢN PHẨM');

	const handleNavigation = (category) => {
		setActiveCategory(category);
	};

	return (
		<div style={{ backgroundColor: '#f5f5f5' }}>
			{/* Card chứa thông tin shop */}
			<div style={{
				backgroundColor: 'rgb(245, 245, 245)',
				overflow: 'hidden'
			}}>
				<ShopHeader activeCategory={activeCategory} onCategoryChange={handleNavigation} />
			</div>

			{/* Banner */}
			<Banner />

			{/* Nội dung chính - kết hợp danh mục và sản phẩm */}
			<div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
				<CategorySection activeCategory={activeCategory} onCategoryChange={handleNavigation} />
				<ProductSection category={activeCategory} />
			</div>
			<div style={{
				backgroundColor: 'rgb(245, 245, 245)',
				boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
				overflow: 'hidden'
			}}>
				<ShopFooter />
			</div>
		</div>
	);
}

export default Shop;