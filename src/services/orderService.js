import api from './axios';

const orderService = {
	// Lấy danh sách tất cả đơn hàng theo userId
	getOrdersByUserId: async (userId) => {
		try {
			const response = await api.get(`/order/${userId}`);
			console.log('API response for all orders:', response.data);
			return response.data;
		} catch (error) {
			console.error(
				'Lỗi khi lấy danh sách đơn hàng:',
				error.response?.data || error.message,
			);
			throw error;
		}
	},

	// Lấy danh sách đơn hàng đã hoàn thành theo userId
	getCompletedOrders: async (userId) => {
		try {
			const response = await api.get(`/order/completed/${userId}`);
			console.log('API response for completed orders:', response.data);
			if (Array.isArray(response.data)) {
				return response.data; // Nếu là mảng, trả về trực tiếp
			} else if (response.data && typeof response.data === 'object') {
				return [response.data]; // Nếu là đối tượng, chuyển thành mảng 1 phần tử
			} else {
				console.warn('Dữ liệu trả về không hợp lệ:', response.data);
				return [];
			}
		} catch (error) {
			console.error(
				'Lỗi khi lấy danh sách đơn hàng đã hoàn thành:',
				error.response?.data || error.message,
			);
			throw error;
		}
	},
};

export default orderService;
