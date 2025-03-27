import React, { useState, useEffect } from 'react';
import { useSeller } from '../../hooks/contexts/SellerContext';
import WelcomeSection from '../../components/Seller/Dashboard/WelcomeSection';
import StatCards from '../../components/Seller/Dashboard/StatCards';
import ChartSection from '../../components/Seller/Dashboard/ChartSection';
import DataSection from '../../components/Seller/Dashboard/DataSection';
import AiAssistant from '../../components/Seller/Dashboard/AiAssistant';
import { productService } from '../../services/productService';

function DashboardPage() {
  const { shops } = useSeller();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0
  });
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

  // Sample data for products
  const [rankingProducts, setRankingProducts] = useState([
    { name: "Protinex Powder", price: 549000, stock: 8478, soldQuantity: 325, totalRevenue: 178425000 },
    { name: "VitaGreen Capsules", price: 150000, stock: 4785, soldQuantity: 412, totalRevenue: 61800000 },
    { name: "Fresh Fruits Basket", price: 299000, stock: 120, soldQuantity: 189, totalRevenue: 56511000 },
    { name: "Organic Coffee Beans", price: 180000, stock: 350, soldQuantity: 278, totalRevenue: 50040000 },
    { name: "Natural Honey Jar", price: 125000, stock: 520, soldQuantity: 367, totalRevenue: 45875000 }
  ]);

  // Sample data for orders
  const [recentOrders, setRecentOrders] = useState([
    { id: '#ORD-2458', customer: 'Nguyễn Văn A', amount: '₫549.000', status: 'completed' },
    { id: '#ORD-2457', customer: 'Trần Thị B', amount: '₫1.230.000', status: 'processing' },
    { id: '#ORD-2456', customer: 'Lê Văn C', amount: '₫899.000', status: 'new' }
  ]);

  // Get current shop
  const currentShop = shops.length > 0 ? shops[0] : { shop_id: null, shop_name: 'Cửa hàng của bạn' };

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        setLoading(true);
        const shopId = currentShop.shop_id || currentShop.id;
        if (!shopId) {
          setLoading(false);
          return;
        }
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
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    // Chỉ gọi fetchProductCount khi shops đã được load
    if (shops.length > 0) {
      fetchProductCount();
    }
  }, [shops, currentShop]);

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
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
        rankingProducts={rankingProducts}
        orders={recentOrders}
      />

      {/* Data tables section */}
      <DataSection rankingProducts={rankingProducts} orders={recentOrders} />
    </div>
  );
}

export default DashboardPage;