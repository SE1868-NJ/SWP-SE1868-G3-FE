import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" stroke="#666" />
        <YAxis yAxisId="left" stroke="#34495e" />
        <YAxis yAxisId="right" orientation="right" stroke="#3498db" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            borderColor: '#ddd',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          name="Doanh thu (đ)"
          stroke="#34495e"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="orders"
          name="Đơn hàng"
          stroke="#3498db"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;