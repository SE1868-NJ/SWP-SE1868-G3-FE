import React, { useEffect } from "react";
import OrderCard from "../layout/OrderLayout/OrderCard";
import { useOrderContext } from "../layout/OrderLayout/OrderContext";
import orderService from "../services/orderService";
import { useState } from "react";

const CompletedOrder = () => {
  const [orders, setOrders] = useState([]);
  const { status } = useOrderContext();
  const userId = "4"; // Có thể lấy từ Auth context
  const [loading, setLoading] = useState(true);

  const fetchCompletedOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getCompletedOrders(userId);
      console.log("API response for completed orders:", data);

      if (!data) {
        setOrders([]);
        return;
      }

      if (Array.isArray(data)) {
        const completedOrders = data.filter(order => String(order.status) === "COMPLETED");
        setOrders(completedOrders);
      } else if (data.status === "COMPLETED") {
        setOrders([data]);
      } else if (data.OrderDetails && Array.isArray(data.OrderDetails)) {
        setOrders(data.OrderDetails.filter(order => String(order.status) === "COMPLETED"));
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching completed orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "completed") {
      fetchCompletedOrders();
    } else {
      setOrders([]); // Xóa danh sách khi không ở trạng thái "completed"
    }
  }, [status]);

  const refreshOrders = () => {
    fetchCompletedOrders();
  };

  if (loading) {
    return <div className="text-center py-4">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container">
      {status === "completed" && orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order, index) => (
            <OrderCard 
              key={order.order_id || index}
              order={order}
              refreshOrders={refreshOrders}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          {status === "completed" 
            ? "Không có đơn hàng nào đã hoàn thành." 
            : "Vui lòng chọn trạng thái 'Đã hoàn thành' để xem đơn hàng."}
        </div>
      )}
    </div>
  );
};

export default CompletedOrder;