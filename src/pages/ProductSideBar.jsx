import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function ProductSideBar({ filters, onFilterChange }) {
    // Đảm bảo filters không bị undefined (fallback mặc định)
    const safeFilters = filters || {
        categories: [],
        priceRange: { min: 0, max: 10000000 }
    };

    const handleCategoryChange = (category) => {
        const newCategories = safeFilters.categories.includes(category)
            ? safeFilters.categories.filter(c => c !== category)
            : [...safeFilters.categories, category];

        onFilterChange({ ...safeFilters, categories: newCategories });
    };

    const handlePriceRangeChange = (range) => {
        onFilterChange({ ...safeFilters, priceRange: range });
    };

    return (
        <div className="p-3 border bg-light">
            <h5 className="fw-bold mb-3">BỘ LỌC TÌM KIẾM</h5>

            {/* Danh mục */}
            <div className="mb-3">
                <h6 className="fw-bold">Theo Danh Mục</h6>
                {['Đồ ăn', 'Đồ uống', 'Đồ ăn chay', 'Đồ ăn sống'].map((category) => (
                    <div key={category}>
                        <input
                            type="checkbox"
                            checked={safeFilters.categories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                        /> {category}
                    </div>
                ))}
            </div>

            {/* Khoảng giá */}
            <div className="mb-3">
                <h6 className="fw-bold">Khoảng giá</h6>
                {[
                    { label: 'Từ 10K - 100K', min: 10000, max: 100000 },
                    { label: 'Từ 100K - 200K', min: 100000, max: 200000 },
                    { label: 'Từ 200K - 300K', min: 200000, max: 300000 },
                    { label: 'Từ 300K - 500K', min: 300000, max: 500000 }
                ].map((range) => (
                    <div key={range.label}>
                        <input
                            type="radio"
                            name="priceRange"
                            checked={safeFilters.priceRange.min === range.min && safeFilters.priceRange.max === range.max}
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
    filters: {
        categories: [],
        priceRange: { min: 0, max: 10000000 }
    },
    onFilterChange: () => {} // Dummy function phòng trường hợp chưa có handler
};

export default ProductSideBar;
