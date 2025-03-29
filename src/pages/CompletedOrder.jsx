import React, { useEffect, useState } from 'react';
import { useOrderContext } from '../hooks/contexts/OrderContext';
import OrderCard from '../layout/OrderLayout/OrderCard';
import {orderService} from '../services/orderService';
import { useAuth } from '../hooks/contexts/AuthContext';

const CompletedOrder = () => {
	const [orders, setOrders] = useState([]);
	const { status } = useOrderContext();
	const {user} = useAuth();
	const userId = user?.id;
	const [loading, setLoading] = useState(true);

	const fetchCompletedOrders = async () => {
		setLoading(true);
		try {
			const data = await orderService.getCompletedOrders(userId);

			if (!data) {
				setOrders([]);
				return;
			}

			if (Array.isArray(data)) {
				const completedOrders = data.filter(
					(order) => String(order.status) === 'COMPLETED',
				);
				setOrders(completedOrders);
			} else if (data.status === 'COMPLETED') {
				setOrders([data]);
			} else if (data.orderDetails && Array.isArray(data.orderDetails)) {
				setOrders(
					data.orderDetails.filter(
						(order) => String(order.status) === 'COMPLETED',
					),
				);
			} else {
				setOrders([]);
			}
		} catch (error) {
			console.error('Error fetching completed orders:', error);
			setOrders([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (status === 'COMPLETED' && userId) {
			fetchCompletedOrders();
		} else {
			setOrders([]); // Xóa danh sách khi không ở trạng thái "completed"
		}
	}, [status]);

	const refreshOrders = () => {
		fetchCompletedOrders();
	};

	if (loading) {
		return <div className='text-center py-4'>Đang tải dữ liệu...aaaa</div>;
	}

	return (
		<div className='container'>
			{status === 'COMPLETED' && orders.length > 0 ? (
				<div className='order-list'>
					{orders.map((order, index) => (
						<OrderCard
							key={order.id || index}
							order={order}
							refreshOrders={refreshOrders}
						/>
					))}
				</div>
			) : (
				<div className='text-center py-4'>	
					{status === 'COMPLETED'
						? 'Không có đơn hàng nào đã hoàn thành.'
						: "Vui lòng chọn trạng thái 'Đã hoàn thành' để xem đơn hàng."}
				</div>
			)}
		</div>
	);
};

export default CompletedOrder;
