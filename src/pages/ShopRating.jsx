import { useState, useEffect } from 'react';
import { shopService } from '../services/shopService';
import { useParams } from 'react-router-dom';

function ShopRating() {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [dateRange, setDateRange] = useState('Chọn thời gian');

	const { shopId } = useParams();
	const [feedbacks, setFeedbacks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStars, setSelectedStars] = useState([]);
	const [inputSearchTerm, setInputSearchTerm] = useState('');

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
	};
	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				setLoading(true);

				// Kiểm tra dateRange có đúng định dạng không
				const dates = dateRange.match(
					/Từ (\d{2}-\d{2}-\d{4}) đến (\d{2}-\d{2}-\d{4})/,
				);
				let startDate = null;
				let endDate = null;

				if (dates) {
					// Chuyển định dạng dd-MM-yyyy sang yyyy-MM-dd để gửi lên API
					startDate = dates[1].split('-').reverse().join('-');
					endDate = dates[2].split('-').reverse().join('-');
				}
				console.log('Fetching feedbacks with:', shopId, startDate, endDate);

				// Gọi API với tham số ngày tháng
				const response = await shopService.getFeedbacksByShop(
					shopId,
					startDate,
					endDate,
				);

				if (
					response &&
					response.status === 'success' &&
					Array.isArray(response.data)
				) {
					setFeedbacks(response.data);
				} else {
					setFeedbacks(Array.isArray(response) ? response : []);
				}
			} catch (error) {
				console.error('Lỗi khi lấy danh sách đánh giá:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchFeedbacks();
	}, [shopId, dateRange]); // Chạy lại khi shopId hoặc dateRange thay đổi

	// Calculate rating statistics
	const calculateRatingStats = () => {
		if (feedbacks.length === 0)
			return { averageRating: 0, totalCount: 0, goodRatioPercent: 0 };

		const totalCount = feedbacks.length;
		const totalRating = feedbacks.reduce((sum, item) => sum + item.rating, 0);
		const averageRating = (totalRating / totalCount).toFixed(1);

		// Count ratings >= 4 as "good"
		const goodRatings = feedbacks.filter((item) => item.rating >= 4).length;
		const goodRatioPercent = Math.round((goodRatings / totalCount) * 100);

		return { averageRating, totalCount, goodRatioPercent };
	};

	// Calculate negative ratings (1-2 stars) that need response
	const getNegativeRatingsCount = () => {
		return feedbacks.filter((item) => item.rating <= 2).length;
	};

	// Get counts by star rating
	const getStarCounts = () => {
		const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

		feedbacks.forEach((item) => {
			// Round to nearest integer for counting
			const roundedRating = Math.round(item.rating);
			if (counts[roundedRating] !== undefined) {
				counts[roundedRating]++;
			}
		});

		return counts;
	};
	//test
	const handleSearch = () => {
		setSearchTerm(inputSearchTerm); // Chỉ lọc khi nhấn nút "Tìm kiếm"
	};

	const handleStarFilterChange = (star) => {
		setSelectedStars((prev) =>
			prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star],
		);
	};
	const filteredFeedbacks =
		selectedStars.length > 0
			? feedbacks.filter((feedback) =>
					selectedStars.includes(Math.round(feedback.rating)),
				)
			: feedbacks;

	const searchedFeedbacks = searchTerm
		? filteredFeedbacks.filter(
				(feedback) =>
					feedback.product?.product_name
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					feedback.user?.full_name
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					feedback.comment?.toLowerCase().includes(searchTerm.toLowerCase()),
			)
		: filteredFeedbacks;

	const stats = calculateRatingStats();
	const starCounts = getStarCounts();
	const negativeCount = getNegativeRatingsCount();

	return (
		<div className='container p-0 m-0'>
			<div className='card mb-4 bg-white rounded-3 shadow-sm p-3'>
				<div className='card-body'>
					<div className='d-flex justify-content-between align-items-center mb-3'>
						<h5 className='mb-0'>
							Đánh Giá Shop{' '}
							<span className='text-danger'>{stats.averageRating}</span>/5
						</h5>
					</div>

					<div className='row g-3'>
						<div className='col-md-6'>
							<div
								className='p-3 border rounded-3 shadow-sm'
								style={{ margin: '10px 0' }}
							>
								<div className='d-flex justify-content-between align-items-center'>
									<div>
										<h6>Tổng lượt đánh giá</h6>
										<h3 className='mb-0'>{stats.totalCount}</h3>
									</div>
								</div>
							</div>
						</div>

						<div className='col-md-6'>
							<div
								className='p-3 border rounded-3 shadow-sm'
								style={{ margin: '10px 0' }}
							>
								<div className='d-flex justify-content-between align-items-center'>
									<div>
										<h6>Tỷ lệ đánh giá tốt</h6>
										<h3 className='mb-0'>{stats.goodRatioPercent}%</h3>
									</div>
									<div className='text-danger'>
										<small>↓0%</small>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='row mt-4'>
						<div className='col-md-6'>
							<div className='card bg-white rounded-3 shadow-sm p-3'>
								<div className='card-body'>
									<h6>Đánh giá tiêu cực cần phản hồi</h6>
									<div className='d-flex align-items-center'>
										<h3 className='mb-0 me-2'>{negativeCount}</h3>
										<button className='btn text-primary btn-sm fw-bold'>
											Xem
										</button>
									</div>
									<small className='text-muted'>
										Các đánh giá có 1 & 2 sao cần bạn phản hồi
									</small>
								</div>
							</div>
						</div>

						<div className='col-md-6'>
							<div className='card bg-white rounded-3 shadow-sm p-3'>
								<div className='card-body'>
									<h6>Đánh giá gần đây</h6>
									<div className='d-flex align-items-center'>
										<h3 className='mb-0 me-2'>{stats.totalCount}</h3>
										<button className='btn text-primary btn-sm fw-bold '>
											Xem
										</button>
									</div>
									<small className='text-muted'>
										Đánh giá mới được cập nhật từ lần truy cập trước
									</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

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
						<div className='form-check'>
							<input
								className={`form-check-input ${selectedStars.includes(5) ? 'border-danger bg-danger' : ''}`}
								type='checkbox'
								id='check5'
								checked={selectedStars.includes(5)}
								onChange={() => handleStarFilterChange(5)}
							/>
							<label className='form-check-label' htmlFor='check5'>
								5 Sao( {starCounts[5]} )
							</label>
						</div>
						<div className='form-check'>
							<input
								className={`form-check-input ${selectedStars.includes(4) ? 'border-danger bg-danger' : ''}`}
								type='checkbox'
								id='check4'
								checked={selectedStars.includes(4)}
								onChange={() => handleStarFilterChange(4)}
							/>
							<label className='form-check-label' htmlFor='check4'>
								4 Sao( {starCounts[4]} )
							</label>
						</div>
						<div className='form-check'>
							<input
								className={`form-check-input ${selectedStars.includes(3) ? 'border-danger bg-danger' : ''}`}
								type='checkbox'
								id='check3'
								checked={selectedStars.includes(3)}
								onChange={() => handleStarFilterChange(3)}
							/>
							<label className='form-check-label' htmlFor='check3'>
								3 Sao( {starCounts[3]} )
							</label>
						</div>
						<div className='form-check'>
							<input
								className={`form-check-input ${selectedStars.includes(2) ? 'border-danger bg-danger' : ''}`}
								type='checkbox'
								id='check2'
								checked={selectedStars.includes(2)}
								onChange={() => handleStarFilterChange(2)}
							/>
							<label className='form-check-label' htmlFor='check2'>
								2 Sao( {starCounts[2]} )
							</label>
						</div>
						<div className='form-check'>
							<input
								className={`form-check-input ${selectedStars.includes(1) ? 'border-danger bg-danger' : ''}`}
								type='checkbox'
								id='check1'
								checked={selectedStars.includes(1)}
								onChange={() => handleStarFilterChange(1)}
							/>
							<label className='form-check-label' htmlFor='check1'>
								1 Sao( {starCounts[1]} )
							</label>
						</div>
					</div>

					<div className='row g-3 mb-3'>
						<div className='col-md-6'>
							<input
								type='text'
								className='form-control'
								placeholder='Tìm Sản Phẩm, Mã Đơn Hàng, Tên đăng nhập người mua'
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
											onClick={() => {
												if (startDate && endDate) {
													const formattedStart = formatDate(startDate);
													const formattedEnd = formatDate(endDate);
													setDateRange(
														`Từ ${formattedStart} đến ${formattedEnd}`,
													);
													setShowDatePicker(false);
												}
											}}
										>
											Áp dụng
										</button>
									</div>
								</div>
							)}
						</div>
						<div className='col-md-2 d-flex gap-2'>
							<button
								className='btn btn-danger '
								style={{ height: '37px', width: '100px' }}
								onClick={handleSearch}
							>
								Tìm
							</button>
							<button
								className='btn btn-outline-secondary'
								style={{ height: '37px', width: '100px' }}
								onClick={() => {
									setInputSearchTerm('');
									setSearchTerm('');
									setSelectedStars([]);
								}}
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
							<div className='col-md-6'>
								<div className='text-muted'>Đánh giá của Người mua</div>
							</div>
							{/* <div className='col-md-2'>
								<div className='text-muted'>Hành động</div>
							</div> */}
						</div>
						{loading ? (
							<div className='text-center py-5'>
								<p className='text-muted mt-3'>Đang tải dữ liệu...</p>
							</div>
						) : searchedFeedbacks.length > 0 ? (
							searchedFeedbacks.map((feedback) => (
								<div key={feedback.id} className='row border-bottom py-2'>
									<div className='col-md-4'>
										<strong>
											{feedback.product?.product_name ||
												'Sản phẩm không xác định'}
										</strong>
									</div>
									<div className='col-md-6'>
										<p>
											<strong>
												{feedback.user?.full_name || 'Người dùng ẩn danh'}
											</strong>
										</p>
										<p>⭐ {feedback.rating} / 5</p>
										<p>{feedback.comment}</p>
									</div>
									{/* <div className='col-md-2 text-center'>
										<button className='btn btn-sm btn-outline-primary'>
											Trả lời
										</button>
									</div> */}
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
		</div>
	);
}

export default ShopRating;
