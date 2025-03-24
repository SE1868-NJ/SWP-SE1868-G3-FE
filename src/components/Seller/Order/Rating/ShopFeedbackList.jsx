import React, { useState } from 'react';

function ShopFeedbackList({
	feedbacks,
	loading,
	starCounts,
	stats,
	onSearch,
	onDateRangeChange,
	onFilterReset,
}) {
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [dateRange, setDateRange] = useState('Chọn thời gian');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [inputSearchTerm, setInputSearchTerm] = useState('');
	const [selectedStars, setSelectedStars] = useState([]);

	const handleSearch = () => {
		onSearch(inputSearchTerm, selectedStars);
	};

	const handleStarFilterChange = (star) => {
		const newSelectedStars = selectedStars.includes(star)
			? selectedStars.filter((s) => s !== star)
			: [...selectedStars, star];

		setSelectedStars(newSelectedStars);
		onSearch(inputSearchTerm, newSelectedStars);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
	};

	const handleResetFilters = () => {
		setInputSearchTerm('');
		setSelectedStars([]);
		setDateRange('Chọn thời gian');
		setStartDate('');
		setEndDate('');
		onFilterReset();
	};

	const handleDateRangeApply = () => {
		if (startDate && endDate) {
			const formattedStart = formatDate(startDate);
			const formattedEnd = formatDate(endDate);
			const newDateRange = `Từ ${formattedStart} đến ${formattedEnd}`;
			setDateRange(newDateRange);
			setShowDatePicker(false);
			onDateRangeChange(startDate, endDate);
		}
	};

	return (
		<div className='card bg-white rounded-3 shadow-sm p-3'>
			<div className='card-body'>
				<h5>Danh sách đánh giá shop</h5>

				<div className='d-flex gap-2 mb-3'>
					<button className='btn btn-outline-danger active'>
						Tất cả ({stats.totalCount})
					</button>
				</div>

				<div className='d-flex gap-2 mb-3'>
					Số sao đánh giá:
					{[5, 4, 3, 2, 1].map((star) => (
						<div className='form-check' key={star}>
							<input
								className={`form-check-input ${selectedStars.includes(star) ? 'border-danger bg-danger' : ''}`}
								type='checkbox'
								id={`check${star}`}
								checked={selectedStars.includes(star)}
								onChange={() => handleStarFilterChange(star)}
							/>
							<label className='form-check-label' htmlFor={`check${star}`}>
								{star} Sao({starCounts[star]})
							</label>
						</div>
					))}
				</div>

				<div className='row g-3 mb-3'>
					<div className='col-md-6'>
						<input
							type='text'
							className='form-control'
							placeholder='Tìm Sản Phẩm, Tên đăng nhập người mua'
							value={inputSearchTerm}
							onChange={(e) => setInputSearchTerm(e.target.value)}
						/>
					</div>
					<div className='col-md-4'>
						<div className='input-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Chọn thời gian'
								value={dateRange}
								onClick={() => setShowDatePicker(!showDatePicker)}
								readOnly
							/>
							<button
								className='input-group-text'
								onClick={() => setShowDatePicker(!showDatePicker)}
							>
								<i className='bi bi-calendar'></i>
							</button>
						</div>
						{showDatePicker && (
							<div className='position-absolute bg-white p-3 shadow rounded border mt-1 z-index-1000'>
								<div className='d-flex gap-2 mb-3'>
									<div>
										<label className='form-label'>Từ ngày</label>
										<input
											type='date'
											className='form-control'
											value={startDate}
											onChange={(e) => setStartDate(e.target.value)}
										/>
									</div>
									<div>
										<label className='form-label'>Đến ngày</label>
										<input
											type='date'
											className='form-control'
											value={endDate}
											onChange={(e) => setEndDate(e.target.value)}
										/>
									</div>
								</div>
								<div className='d-flex justify-content-end gap-2'>
									<button
										className='btn btn-outline-secondary'
										onClick={() => {
											setShowDatePicker(false);
											setStartDate('');
											setEndDate('');
										}}
									>
										Đặt lại
									</button>
									<button
										className='btn btn-danger'
										onClick={handleDateRangeApply}
									>
										Áp dụng
									</button>
								</div>
							</div>
						)}
					</div>
					<div className='col-md-2 d-flex gap-2'>
						<button
							className='btn btn-danger'
							style={{ height: '37px', width: '100px' }}
							onClick={handleSearch}
						>
							Tìm
						</button>
						<button
							className='btn btn-outline-secondary'
							style={{ height: '37px', width: '100px' }}
							onClick={handleResetFilters}
						>
							Đặt lại
						</button>
					</div>
				</div>

				<div className='container mt-3'>
					<div className='row bg-light py-2'>
						<div className='col-md-4'>
							<div className='text-muted'>Thông tin Sản phẩm</div>
						</div>
						<div className='col-md-5'>
							<div className='text-muted'>Đánh giá của Người mua</div>
						</div>
						<div className='col-md-3'>
							<div className='text-muted'>Thời gian</div>
						</div>
					</div>
					{loading ? (
						<div className='text-center py-5'>
							<p className='text-muted mt-3'>Đang tải dữ liệu...</p>
						</div>
					) : feedbacks.length > 0 ? (
						feedbacks.map((feedback) => (
							<div key={feedback.id} className='row border-bottom py-2'>
								<div className='col-md-4'>
									<strong>
										{feedback.product?.product_name ||
											'Sản phẩm không xác định'}
									</strong>
								</div>
								<div className='col-md-5'>
									<p>
										<strong>
											{feedback.user?.full_name || 'Người dùng ẩn danh'}
										</strong>
									</p>
									<p>⭐ {feedback.rating} / 5</p>
									<p>{feedback.comment}</p>
								</div>
								<div className='col-md-3'>
									<p>{formatDate(feedback.created_at)}</p>
                  
								</div>
							</div>
						))
					) : (
						<div className='text-center py-5'>
							<p className='text-muted mt-3'>
								Chưa có đánh giá nào dành cho Shop của bạn
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ShopFeedbackList;
