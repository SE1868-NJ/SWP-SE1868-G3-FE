import React, { useEffect, useState } from 'react';
import RevenueChart from './RevenueChart';
import { orderService } from '../../../services/orderService';

const ChartSection = ({
  data,
  timeRange,
  onTimeRangeChange,
  loading,
  setLoading,
  shopId,
}) => {
  const [chartData, setChartData] = useState([]);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}`;
  };

  useEffect(() => {
      const fetchChartData = async () => {
          try {
              setLoading(true);
              const month = new Date();
              const dateStr = month.toISOString().split('T')[0];
 

              if (timeRange === 'month') {
                const monthlyStats = await orderService.getDailyStatsInMonth(shopId, dateStr);
                data = monthlyStats.map(item => ({
                  name: formatDate(item.date),
                  revenue: item.revenue,
                  orders: item.orders
                }));
              }

              setChartData(data);
              setLoading(false);
          } catch (error) {
              console.error('Lỗi khi lấy dữ liệu biểu đồ:', error);
              setLoading(false);
          }
      };

      if (shopId) {
          fetchChartData();
      }
  }, [shopId, timeRange, setLoading]);

  return (
      <div className='card mb-4 shadow-sm'>
          <div className='card-header d-flex justify-content-between align-items-center bg-white'>
              <h4 className='mb-0 fw-bold' style={{ color: '#2c3e50' }}>
                  Tổng Quan Doanh Thu & Đơn Hàng
              </h4>
              <div>
                  <select
                      className='form-select form-select-sm'
                      value={timeRange}
                      onChange={(e) => onTimeRangeChange(e.target.value)}
                      disabled={loading}
                      style={{ minWidth: '120px', borderColor: '#34495e' }}
                  >
                      {/* <option value='today'>Hôm nay</option>
                      <option value='yesterday'>Hôm qua</option>
                      <option value='week'>7 ngày qua</option> */}
                      <option value='month'>Tháng này</option>
                  </select>
              </div>
          </div>
          <div className='card-body' style={{ backgroundColor: '#f8f9fa' }}>
              {loading ? (
                  <div
                      className='d-flex justify-content-center align-items-center'
                      style={{ height: '300px' }}
                  >
                      <div
                          className='spinner-border'
                          role='status'
                          style={{ color: '#34495e' }}
                      >
                          <span className='visually-hidden'>Đang tải...</span>
                      </div>
                  </div>
              ) : (
                  <RevenueChart data={chartData} />
              )}
          </div>
      </div>
  );
};


export default ChartSection;
