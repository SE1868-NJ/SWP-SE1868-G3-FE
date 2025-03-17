import React, { useEffect, useState } from 'react';
import { useOrderContext } from '../hooks/contexts/OrderContext';
import OrderCard from '../layout/OrderLayout/OrderCard';
import { orderService } from '../services/orderService';
import { useAuth } from '../hooks/contexts/AuthContext';

const AllOrders = () => {
	const [orders, setOrders] = useState([]);
	const { status } = useOrderContext();
	const { user } = useAuth();
	const userId = user?.id;
	const [loading, setLoading] = useState(true);

	const fetchAllOrders = async () => {
		setLoading(true);
		try {
			const data = await orderService.getAllOrders(userId);
			console.log('API response for all orders:', data);

			if (!data) {
				setOrders([]);
				return;
			}

			if (Array.isArray(data)) {
				setOrders(data);
			} else if (data.OrderDetails && Array.isArray(data.OrderDetails)) {
				setOrders(data.OrderDetails);
			} else {
				setOrders([]);
			}
		} catch (error) {
			console.error('Error fetching all orders:', error);
			setOrders([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (status === 'all' && userId) {
			fetchAllOrders();
		} else {
			setOrders([]); // Xóa danh sách khi không ở trạng thái "all"
		}
	}, [status, userId]);

	const refreshOrders = () => {
		fetchAllOrders();
	};

	if (loading) {
		return <div className='text-center py-4'>Đang tải dữ liệu...</div>;
	}

	return (
		<div className='container'>
			{status === 'all' && orders.length > 0 ? (
				<div className='order-list'>
					{orders.map((order, index) => (
						<OrderCard
							key={order.order_id || index}
							order={order}
							refreshOrders={refreshOrders}
							
						/>
					))}
				</div>
			) : (
				<div className='text-center py-4'>
					{status === 'all'
						? 'Không có đơn hàng nào.'
						: "Vui lòng chọn trạng thái 'Tất cả' để xem đơn hàng."}
				</div>
			)}
		</div>
	);
};

export default AllOrders;
