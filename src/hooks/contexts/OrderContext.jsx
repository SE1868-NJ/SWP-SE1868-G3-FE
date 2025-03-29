import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
	const [orders, setOrders] = useState([]);
	const [status, setStatus] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		// Gọi API hoặc cập nhật dữ liệu theo trạng thái
		fetchOrdersByStatus(status);
	}, [status]);

	const fetchOrdersByStatus = (status) => {
		// Giả lập dữ liệu từ server theo trạng thái
		const allOrders = {
			all: [{ id: 1, name: 'Tất cả đơn hàng' }],
			PENDING: [{ id: 2, name: 'Đơn chờ thanh toán' }],
			shipping: [{ id: 3, name: 'Đơn vận chuyển' }],
			delivery: [{ id: 4, name: 'Đơn chờ giao hàng' }],
			COMPLETED: [{ id: 5, name: 'Đơn đã hoàn thành' }],
			CANCELLED: [{ id: 6, name: 'Đơn đã hủy' }],
			refund: [{ id: 7, name: 'Đơn trả hàng/hoàn tiền' }],
		};
		setOrders(allOrders[status] || []);
	};

	const handleStatusChange = (newStatus) => {
		if (newStatus !== status) {
			setStatus(newStatus);
			if (newStatus === 'account') {
				navigate('/profile');
			}
			if (newStatus === 'CANCELLED') {
				navigate('/orders/cancelled');
			}
			if(newStatus === 'all') {
				navigate('/orders/all');
			}
			if (newStatus === 'PENDING') {
				navigate('/orders/pending');
			}
			if (newStatus === 'COMPLETED') {
				navigate('/orders/completed');
			}
		}
	};

	return (
		<OrderContext.Provider
			value={{
				orders,
				status,
				setStatus,
				handleStatusChange,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
