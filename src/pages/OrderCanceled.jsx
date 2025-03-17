import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/contexts/AuthContext';
import OrderCard from '../layout/OrderLayout/OrderCard';
import { orderService } from '../services/orderService';
function OrderCanceled() {
	const [orders, setOrders] = useState([]);
	const { user } = useAuth();
	const userId = user?.id;

	useEffect(() => {
		const fetchCancelledOrders = async () => {
			try {
				const data = await orderService.getCancelledOrders(userId);
				setOrders(data);
			} catch (error) {
				console.error(
					'Error fetching cancelled orders:',
					error.response?.data || error.message,
				);
			}
		};
		fetchCancelledOrders();
	}, [userId]);

	// Hàm xử lý hủy đơn hàng
	const handleCancelOrder = async (orderId) => {
		try {
			const data = await orderService.cancelOrder(orderId);
			alert(data.message);
			setOrders(orders.filter((order) => order.order_id !== orderId));
		} catch (error) {
			console.error('Error cancelling order:', error);
			alert(error.message || 'Có lỗi xảy ra');
		}
	};

	return (
		<div className='container-fluid p-0'>
			<div className='row g-0'>
				<div>
					<div className='container'>
						{orders.length > 0 ? (
							orders.map((order) => (
								<OrderCard
									key={order.order_id}
									order={order}
									activeTab='cancelled'
								/>
							))
						) : (
							<p>Không có đơn hàng nào đã hủy.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderCanceled;
