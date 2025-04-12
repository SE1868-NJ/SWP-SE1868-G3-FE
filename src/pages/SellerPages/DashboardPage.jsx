import React, { useState, useEffect } from 'react';
import { useSeller } from '../../hooks/contexts/SellerContext';
import WelcomeSection from '../../components/Seller/Dashboard/WelcomeSection';
import StatCards from '../../components/Seller/Dashboard/StatCards';
import ChartSection from '../../components/Seller/Dashboard/ChartSection';
import DataSection from '../../components/Seller/Dashboard/DataSection';
import AiAssistant from '../../components/Seller/Dashboard/AiAssistant';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';

function DashboardPage() {
	const { shops } = useSeller();
	const [stats, setStats] = useState({
		totalOrders: 0,
		totalProducts: 0,
		totalRevenue: 0,
	});

	const [revenueProducts, setRevenueProducts] = useState([]); // Sản phẩm theo doanh thu
	const [quantityProducts, setQuantityProducts] = useState([]); // Sản phẩm theo số lượng
	const [activeTab, setActiveTab] = useState('revenue'); 

	const [timeRange, setTimeRange] = useState('month');
	const [loading, setLoading] = useState(true);
	const [recentOrders, setRecentOrders] = useState([]);


	// Get current shop
	const currentShop =
		shops.length > 0
			? shops[0]
			: { shop_id: null, shop_name: 'Cửa hàng của bạn' };
	const shopId = currentShop.shop_id || currentShop.id;
	// Lấy tổng số sản phẩm
	useEffect(() => {
		const fetchShopData = async () => {
			try {
				setLoading(true);

				if (!shopId) {
					setLoading(false);
					return;
				}

				// Lấy thống kê tổng quan từ API
				try {
					const statsData = await orderService.getDashboardStats(
						shopId,
						timeRange,
					);
					setStats((prevStats) => ({
						...prevStats,
						totalOrders: statsData.totalOrders || 0,
						totalRevenue: statsData.totalRevenue || 0,
					}));
				} catch (statsError) {
					console.error('Lỗi khi lấy thống kê:', statsError);
				}

				// Lấy sản phẩm theo shop ID
				try {
					const productsResponse =
						await productService.getProductsByShop(shopId);
					const shopProducts = productsResponse?.products || [];
					setStats((prevStats) => ({
						...prevStats,
						totalProducts: shopProducts.length || 0,
					}));
				} catch (apiError) {
					console.error('Lỗi API khi lấy sản phẩm:', apiError);
				}

				setLoading(false);
			} catch (error) {
				console.error('Lỗi khi fetchShopData:', error);
				setLoading(false);
			}
		};

		if (shopId) {
			fetchShopData();
		}
	}, [shopId, timeRange]);

	// Lấy dữ liệu xếp hạng sản phẩm
	useEffect(() => {
		const fetchRankingProducts = async () => {
			try {
				setLoading(true);

				if (!shopId) {
					setLoading(false);
					return;
				}

				// Gọi song song cả hai API
				const [revenueResponse, quantityResponse] = await Promise.all([
					productService.getTopProductsByRevenue(5),
					productService.getTopProductsByQuantity(5),
				]);

				setRevenueProducts(revenueResponse || []);
				setQuantityProducts(quantityResponse || []);

				setLoading(false);
			} catch (error) {
				console.error('Lỗi khi lấy sản phẩm xếp hạng:', error);
				setLoading(false);
			}
		};

		if (shopId) {
			fetchRankingProducts();
		}
	}, [shopId]);

	//đơn hàng gần đây
	useEffect(() => {
		const fetchRecentOrders = async () => {
			try {
				if (!shopId) return;

				const response = await orderService.getRecentOrdersByShop(shopId);
				setRecentOrders(response.orders || []);
			} catch (error) {
				console.error('Lỗi khi fetch đơn hàng gần đây:', error);
			}
		};

		if (shopId) {
			fetchRecentOrders();
		}
	}, [shopId]);

	const handleTimeRangeChange = (newRange) => {
		setTimeRange(newRange);
	};

	// Xử lý chuyển tab
	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div className='container-fluid p-4'>
			{/* Welcome section */}
			<WelcomeSection shopName={currentShop.shop_name} />

			{/* Stats cards */}
			<StatCards stats={stats} />

			{/* Chart section */}
			<ChartSection
				shopId={shopId}
				timeRange={timeRange}
				onTimeRangeChange={handleTimeRangeChange}
				loading={loading}
				setLoading={setLoading}
			/>

			{/* AI Assistant */}
			<AiAssistant
				// chartData={chartData}
				rankingProducts={
					activeTab === 'revenue' ? revenueProducts : quantityProducts
				}
				orders={recentOrders}
			/>

			{/* Data tables section */}
			<DataSection
				rankingProducts={
					activeTab === 'revenue' ? revenueProducts : quantityProducts
				}
				orders={recentOrders}
				activeTab={activeTab}
				onTabChange={handleTabChange}
			/>
		</div>
	);
}

export default DashboardPage;
