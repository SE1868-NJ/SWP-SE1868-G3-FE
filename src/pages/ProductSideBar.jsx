import React, { useEffect, useState } from 'react';

function ProductSideBar({ filters, onFilterChange, allCategories = [] }) {
	const [localFilters, setLocalFilters] = useState(filters || {
		categories: [],
		priceRange: { min: 0, max: 10000000 }
	});

	// State để kiểm soát dropdown categories
	const [isCategoryOpen, setIsCategoryOpen] = useState(true);
	const [isPriceOpen, setIsPriceOpen] = useState(true);

	// Cập nhật state local khi props thay đổi
	useEffect(() => {
		setLocalFilters(filters || { categories: [], priceRange: { min: 0, max: 10000000 } });
	}, [filters]);

	// Danh sách cố định nếu API không trả về
	const fixedCategories = [
		'Hải sản', 'Thịt tươi', 'Rau củ quả', 'Gia vị', 'Trứng và sữa',
		'Thịt nhập khẩu', 'Đồ ăn nhanh', 'Đồ uống', 'Đồ ăn vặt',
		'Đồ ăn nhanh đặc biệt', 'Đồ ăn mặn', 'Đồ ăn chay'
	];

	// Sử dụng danh mục từ API nếu có, nếu không thì dùng danh mục mặc định
	const displayCategories = allCategories.length > 0 ? allCategories : fixedCategories;

	const handleCategoryChange = (category) => {
		console.log("Selected category:", category);

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

	const priceRanges = [
		{ id: 'price-all', label: 'Tất cả', min: 0, max: 10000000 },
		{ id: 'price-10-100', label: 'Từ 10K - 100K', min: 10000, max: 100000 },
		{ id: 'price-100-200', label: 'Từ 100K - 200K', min: 100000, max: 200000 },
		{ id: 'price-200-300', label: 'Từ 200K - 300K', min: 200000, max: 300000 },
		{ id: 'price-300-500', label: 'Từ 300K - 500K', min: 300000, max: 500000 }
	];

	return (
		<div style={{
			padding: '15px',
			position: 'sticky',
			top: '20px'
		}}>
			<div style={{
				display: 'flex',
				alignItems: 'center',
				marginBottom: '15px',
				borderBottom: '2px solid #dc3545',
				paddingBottom: '10px'
			}}>
				<i className="bi bi-funnel-fill" style={{
					color: '#dc3545',
					marginRight: '10px',
					fontSize: '1.2rem'
				}}></i>
				<h4 style={{
					margin: '0',
					fontWeight: '600',
					fontSize: '1.25rem',
					color: '#dc3545'
				}}>
					BỘ LỌC TÌM KIẾM
				</h4>
			</div>

			{/* Categories Dropdown */}
			<div style={{ marginBottom: '10px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
				<div
					onClick={() => setIsCategoryOpen(!isCategoryOpen)}
					style={{
						padding: '12px 15px',
						backgroundColor: '#f8f9fa',
						cursor: 'pointer',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottom: isCategoryOpen ? '1px solid #eee' : 'none'
					}}
				>
					<h5 style={{
						margin: '0',
						fontSize: '1rem',
						fontWeight: '600',
					}}>
						Theo Danh Mục
					</h5>
					<i className={`bi bi-chevron-${isCategoryOpen ? 'up' : 'down'}`}></i>
				</div>

				{isCategoryOpen && (
					<div style={{
						padding: '12px 15px',
						maxHeight: '300px',
						overflowY: 'auto'
					}}>
						{displayCategories.map((category, index) => (
							<div key={`category-${index}`} style={{ marginBottom: '8px' }}>
								<label style={{
									display: 'flex',
									alignItems: 'center',
									cursor: 'pointer'
								}}>
									<input
										type="checkbox"
										checked={localFilters.categories.includes(category)}
										onChange={() => handleCategoryChange(category)}
										style={{ marginRight: '8px' }}
									/>
									<span>{category}</span>
								</label>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Price Range Dropdown */}
			<div style={{ marginBottom: '10px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
				<div
					onClick={() => setIsPriceOpen(!isPriceOpen)}
					style={{
						padding: '12px 15px',
						backgroundColor: '#f8f9fa',
						cursor: 'pointer',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottom: isPriceOpen ? '1px solid #eee' : 'none'
					}}
				>
					<h5 style={{
						margin: '0',
						fontSize: '1rem',
						fontWeight: '600',
					}}>
						Khoảng giá
					</h5>
					<i className={`bi bi-chevron-${isPriceOpen ? 'up' : 'down'}`}></i>
				</div>

				{isPriceOpen && (
					<div style={{ padding: '12px 15px' }}>
						{priceRanges.map((range, index) => (
							<div key={`price-${index}`} style={{ marginBottom: '8px' }}>
								<label style={{
									display: 'flex',
									alignItems: 'center',
									cursor: 'pointer'
								}}>
									<input
										type="radio"
										name="priceRange"
										checked={localFilters.priceRange.min === range.min &&
											localFilters.priceRange.max === range.max}
										onChange={() => handlePriceRangeChange(range)}
										style={{ marginRight: '8px' }}
									/>
									<span>{range.label}</span>
								</label>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default ProductSideBar;