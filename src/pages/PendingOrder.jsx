import { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import OrderCard from '../layout/OrderLayout/OrderCard';
import { useAuth } from '../hooks/contexts/AuthContext';

function PendingOrder() {
	const [orders, setOrders] = useState([]);
	const {user} = useAuth();
	const userId = user?.id;
	useEffect(() => {
		const fetchPendingOrder = async () => {
			try {
				const data = await orderService.getPendingPaymentOrders(userId);
				setOrders(data);
			} catch (error) {
				console.error(
					'Error fetching pending order:',
					error.response?.data || error.message,
				);
			}
		};
		fetchPendingOrder();
	}, [userId]);

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
									activeTab='pending'
								/>
							))
						) : (
							<p>Không có đơn hàng nào chờ thanh toán.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PendingOrder;
