import React from 'react';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const RevenueChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip formatter={(value, name) => {
        if (name === "Doanh thu (đ)") {
          return [`₫${value.toLocaleString('vi-VN')}`, name];
        }
        return [value, name];
      }} />
      <Legend />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="revenue"
        stroke="#8884d8"
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        name="Doanh thu (đ)"
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="orders"
        stroke="#82ca9d"
        strokeWidth={2}
        name="Đơn hàng"
      />
    </LineChart>
  </ResponsiveContainer>
);

export default RevenueChart;