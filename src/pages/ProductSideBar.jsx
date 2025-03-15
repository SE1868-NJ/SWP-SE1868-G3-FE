import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

const defaultFilters = {
    categories: [],
    priceRange: { min: 0, max: 10000000 }
};

function ProductSideBar({ filters, onFilterChange, allCategories=[] }) {
    // Đảm bảo filters không bị undefined (fallback mặc định)
    // const safeFilters = filters || {
    //     categories: [],
    //     priceRange: { min: 0, max: 10000000 }
    // };
    const [localFilters, setLocalFilters]=useState(filters || defaultFilters);
    useEffect(() => {
        setLocalFilters(filters || defaultFilters);
    }, [filters]);

    const handleCategoryChange = (category) => {
        const newCategories = localFilters.categories.includes(category)
			? localFilters.categories.filter(c => c !== category)
			: [...localFilters.categories, category];

		const updatedFilters = { ...localFilters, categories: newCategories };
		setLocalFilters(updatedFilters);
		onFilterChange(updatedFilters);
    };

    const handlePriceRangeChange = (range) => {
        const updatedFilters = { ...localFilters, priceRange: range };
		setLocalFilters(updatedFilters);
		onFilterChange(updatedFilters);
    };

    return (
        <div className="p-3 border bg-light">
            <h5 className="fw-bold mb-3">BỘ LỌC TÌM KIẾM</h5>

            {/* Danh mục */}
            <div className="mb-3">
				<h6 className="fw-bold">Theo Danh Mục</h6>
				{allCategories.map((category) => (
					<div key={category}>
						<input
							type="checkbox"
							checked={localFilters.categories.includes(category)}
							onChange={() => handleCategoryChange(category)}
						/> {category}
					</div>
				))}
			</div>

            {/* Khoảng giá */}
            <div className="mb-3">
				<h6 className="fw-bold">Khoảng giá</h6>
				{[
					{ label: 'Tất cả', min: 0, max: 10000000 },
					{ label: 'Từ 10K - 100K', min: 10000, max: 100000 },
					{ label: 'Từ 100K - 200K', min: 100000, max: 200000 },
					{ label: 'Từ 200K - 300K', min: 200000, max: 300000 },
					{ label: 'Từ 300K - 500K', min: 300000, max: 500000 }
				].map((range) => (
					<div key={range.label}>
						<input
							type="radio"
							name="priceRange"
							checked={localFilters.priceRange.min === range.min && localFilters.priceRange.max === range.max}
							onChange={() => handlePriceRangeChange(range)}
						/> {range.label}
					</div>
				))}
			</div>
        </div>
    );
}

// Nếu cha quên truyền `filters`, component này vẫn chạy được nhờ defaultProps
ProductSideBar.defaultProps = {
	filters: defaultFilters,
	onFilterChange: () => {},
	allCategories: ['Đồ ăn', 'Đồ uống', 'Đồ ăn chay', 'Đồ ăn sống'] // default để tránh crash nếu chưa fetch kịp
};

export default ProductSideBar;
