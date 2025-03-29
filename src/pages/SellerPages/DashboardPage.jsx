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
    totalProducts: 0
  });

  const [revenueProducts, setRevenueProducts] = useState([]); // Sản phẩm theo doanh thu
  const [quantityProducts, setQuantityProducts] = useState([]); // Sản phẩm theo số lượng
  const [activeTab, setActiveTab] = useState('revenue'); // Tab đang active

  const [timeRange, setTimeRange] = useState('today');
  const [loading, setLoading] = useState(true);

  // Sample data for charts
  const [chartData, setChartData] = useState([
    { name: '00:00', revenue: 0, orders: 0 },
    { name: '03:00', revenue: 0, orders: 0 },
    { name: '06:00', revenue: 1500, orders: 2 },
    { name: '09:00', revenue: 3500, orders: 5 },
    { name: '12:00', revenue: 5000, orders: 8 },
    { name: '15:00', revenue: 4800, orders: 7 },
    { name: '18:00', revenue: 6200, orders: 10 },
    { name: '21:00', revenue: 7500, orders: 12 }
  ]);

  // Sample data for orders
  const [recentOrders, setRecentOrders] = useState([
    { id: '#ORD-2458', customer: 'Nguyễn Văn A', amount: '₫549.000', status: 'completed' },
    { id: '#ORD-2457', customer: 'Trần Thị B', amount: '₫1.230.000', status: 'processing' },
    { id: '#ORD-2456', customer: 'Lê Văn C', amount: '₫899.000', status: 'new' }
  ]);

  // Get current shop
  const currentShop = shops.length > 0 ? shops[0] : { shop_id: null, shop_name: 'Cửa hàng của bạn' };

  // Lấy tổng số sản phẩm
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setLoading(true);
        const shopId = currentShop.shop_id || currentShop.id;

        if (!shopId) {
          setLoading(false);
          return;
        }

        // Fetch products count
        try {
          // Lấy sản phẩm theo shop ID
          const productsResponse = await productService.getProductsByShop(shopId);
          const shopProducts = productsResponse?.products || [];

          // Cập nhật tổng số sản phẩm
          setStats(prevStats => ({
            ...prevStats,
            totalProducts: shopProducts.length || 0
          }));
        } catch (apiError) {
          console.error("Lỗi API khi lấy sản phẩm:", apiError);
        }

        // Fetch orders count
        try {
          // Lấy số lượng đơn hàng của shop
          const orderCount = await orderService.getOrderCountByShopId(shopId);

          // Cập nhật tổng số đơn hàng
          setStats(prevStats => ({
            ...prevStats,
            totalOrders: orderCount || 0
          }));
        } catch (orderError) {
          console.error("Lỗi khi lấy số lượng đơn hàng:", orderError);
        }

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi fetchShopData:", error);
        setLoading(false);
      }
    };

    // Chỉ gọi fetchShopData khi shops đã được load
    if (shops.length > 0) {
      fetchShopData();
    }
  }, [shops, currentShop]);

  // Lấy dữ liệu xếp hạng sản phẩm (cả doanh thu và số lượng)
  useEffect(() => {
    const fetchRankingProducts = async () => {
      try {
        setLoading(true);
        const shopId = currentShop.shop_id || currentShop.id;
        if (!shopId) {
          setLoading(false);
          return;
        }

        // Gọi song song cả hai API để tối ưu hiệu suất
        const [revenueResponse, quantityResponse] = await Promise.all([
          productService.getTopProductsByRevenue(5),
          productService.getTopProductsByQuantity(5)
        ]);

        console.log("Dữ liệu sản phẩm theo doanh thu:", revenueResponse);
        console.log("Dữ liệu sản phẩm theo số lượng:", quantityResponse);

        // Cập nhật cả hai state
        setRevenueProducts(revenueResponse || []);
        setQuantityProducts(quantityResponse || []);

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm xếp hạng:", error);
        setLoading(false);
      }
    };

    if (shops.length > 0) {
      fetchRankingProducts();
    }
  }, [shops, currentShop]);

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
  };

  // Xử lý chuyển tab
  const handleTabChange = (tab) => {
    console.log("Chuyển tab sang:", tab);
    setActiveTab(tab);
  };

  return (
    <div className="container-fluid p-4">
      {/* Welcome section */}
      <WelcomeSection shopName={currentShop.shop_name} />

      {/* Stats cards */}
      <StatCards stats={stats} />

      {/* Chart section */}
      <ChartSection
        data={chartData}
        timeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
        loading={loading}
      />

      {/* AI Assistant */}
      <AiAssistant
        chartData={chartData}
        rankingProducts={activeTab === 'revenue' ? revenueProducts : quantityProducts}
        orders={recentOrders}
      />

      {/* Data tables section */}
      <DataSection
        rankingProducts={activeTab === 'revenue' ? revenueProducts : quantityProducts}
        orders={recentOrders}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
}

export default DashboardPage;