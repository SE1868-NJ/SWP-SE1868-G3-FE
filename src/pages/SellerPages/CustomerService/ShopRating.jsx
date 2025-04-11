import { useState, useEffect } from 'react';
import { shopService } from '../../../services/shopService';
import { useParams } from 'react-router-dom';
import ShopRatingOverview from '../../../components/Seller/CustomerService/Rating/ShopRatingOverview';
import ShopFeedbackList from '../../../components/Seller/CustomerService/Rating/ShopFeedbackList';
import { useAuth } from '../../../hooks/contexts/AuthContext';

function ShopRating() {
	const { shop_id } = useAuth();
	const [feedbacks, setFeedbacks] = useState([]);
	const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStars, setSelectedStars] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

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

	// Calculate negative ratings (1-3 stars) that need response
	const getNegativeRatingsCount = () => {
		return feedbacks.filter((item) => item.rating <= 3).length;
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

	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				setLoading(true);

				const response = await shopService.getFeedbacksByShop(
					shop_id,
					startDate,
					endDate,
				);

				if (
					response &&
					response.status === 'success' &&
					Array.isArray(response.data)
				) {
					setFeedbacks(response.data);
					setFilteredFeedbacks(response.data);
				} else {
					setFeedbacks(Array.isArray(response) ? response : []);
					setFilteredFeedbacks(Array.isArray(response) ? response : []);
				}
			} catch (error) {
				console.error('Lỗi khi lấy danh sách đánh giá:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchFeedbacks();
	}, [shop_id, startDate, endDate]);

	// Handle search and filter
	const handleSearch = (searchText, stars) => {
		setSearchTerm(searchText);
		setSelectedStars(stars);

		let results = feedbacks;

		// Filter by stars
		if (stars.length > 0) {
			results = results.filter((feedback) =>
				stars.includes(Math.round(feedback.rating)),
			);
		}

		// Filter by search text
		if (searchText) {
			results = results.filter(
				(feedback) =>
					feedback.product?.product_name
						?.toLowerCase()
						.includes(searchText.toLowerCase()) ||
					feedback.user?.full_name
						?.toLowerCase()
						.includes(searchText.toLowerCase()) ||
					feedback.comment?.toLowerCase().includes(searchText.toLowerCase()),
			);
		}

		setFilteredFeedbacks(results);
	};

	const handleDateRangeChange = (start, end) => {
		setStartDate(start);
		setEndDate(end);
	};

	const handleFilterReset = () => {
		setSearchTerm('');
		setSelectedStars([]);
		setStartDate(null);
		setEndDate(null);
		setFilteredFeedbacks(feedbacks);
	};

	const stats = calculateRatingStats();
	const starCounts = getStarCounts();
	const negativeCount = getNegativeRatingsCount();

	return (
		<div className='container p-0 m-0'>
			<ShopRatingOverview stats={stats} negativeCount={negativeCount} />

			<ShopFeedbackList
				feedbacks={filteredFeedbacks}
				loading={loading}
				starCounts={starCounts}
				stats={stats}
				onSearch={handleSearch}
				onDateRangeChange={handleDateRangeChange}
				onFilterReset={handleFilterReset}
			/>
		</div>
	);
}

export default ShopRating;
