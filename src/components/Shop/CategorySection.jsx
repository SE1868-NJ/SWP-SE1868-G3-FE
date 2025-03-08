import React from 'react';

const CategorySection = ({ activeCategory, onCategoryChange, categories = [] }) => {
	const allProductsOption = 'TẤT CẢ SẢN PHẨM';

	const displayCategories = [allProductsOption, ...categories.map(cat => cat.name)];

	return (
		<div
			id="category-section"
			style={{
				width: '220px',
				backgroundColor: 'white',
				padding: '20px',
				borderRadius: '10px',
				boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
				alignSelf: 'flex-start',
				border: '1px solid #e8e8e8'
			}}
		>
			<div style={{
				color: '#333',
				fontWeight: '700',
				fontSize: '17px',
				marginBottom: '18px',
				paddingBottom: '12px',
				borderBottom: '1px solid #f0f0f0'
			}}>Danh Mục</div>

			{displayCategories.map((category, index) => {
				const isActive = activeCategory === category;

				return (
					<div
						key={index}
						onClick={() => onCategoryChange(category)}
						style={{
							padding: '12px 15px',
							cursor: 'pointer',
							fontSize: '15px',
							color: isActive ? '#ee4d2d' : '#444',
							fontWeight: isActive ? '600' : '500',
							transition: 'all 0.2s ease',
							borderRadius: '8px',
							backgroundColor: isActive ? '#fff6f6' : 'transparent',
							border: isActive ? '1px solid #ffded2' : '1px solid transparent',
							marginBottom: '6px',
							display: 'flex',
							alignItems: 'center',
							position: 'relative'
						}}
						onMouseOver={(e) => !isActive && (e.currentTarget.style.backgroundColor = '#f9f9f9')}
						onMouseOut={(e) => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
					>
						{isActive && (
							<div style={{
								position: 'absolute',
								left: 0,
								top: 0,
								bottom: 0,
								width: '3px',
								backgroundColor: '#ee4d2d',
								borderRadius: '0 2px 2px 0'
							}}></div>
						)}
						{category}
					</div>
				);
			})}
		</div>
	);
};

export default CategorySection;