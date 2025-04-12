import api from './axios';

export const orderService = {
	createOrder: async (dataOrder) => {
		const response = await api.post('/order/create_order', dataOrder);
		return response;
	},

	getOrdersByUserId: async (userId) => {
		try {
			const response = await api.get(`/order/${userId}`);
			return response.data;
		} catch (error) {
			console.error(
				'Lỗi khi lấy danh sách đơn hàng:',
				error.response?.data || error.message,
			);
			throw error;
		}
	},

	getCompletedOrders: async (userId) => {
		try {
			const response = await api.get(`/order/completed/${userId}`);
			return response.data;
		} catch (error) {
			console.error(
				'Lỗi khi lấy danh sách đơn hàng đã hoàn thành:',
				error.response?.data || error.message,
			);
			throw error;
		}
	},


	getCancelledOrders: async (userId) => {
		try {
			const response = await api.get(`/order/cancelled/${userId}`);
			return response.data;
		} catch (error) {
			console.error("Lỗi khi lấy danh sách đơn hàng đã hủy", error.response?.data || error.message);
			throw error;
		}
	},

	cancelOrder: async (orderId) => {
		try {
			const response = await api.put(`/order/cancelled/${orderId}`);
			return response.data;
		} catch (error) {
			console.error("Lỗi khi hủy đơn hàng", error);
			throw error;
		}
	},
	getAllOrders: async (userId) => {
		try {

			const response = await api.get(`order/all_orders/${userId}`);
			return response.data;
		} catch (error) {
			console.error(
				'Loi khi lấy tất cả các đơn hàng!',
				error.response?.data || error.message,
			);
			throw error;
		}
	},

	getPendingPaymentOrders: async (userId) => {
		try {
			const response = await api.get(`/order/pending/${userId}`);
			return response.data;
		} catch (error) {
			console.error("Lỗi khi lấy danh sách đơn hàng đang chờ thanh toán:", error);
			throw error;
		}
	},

	getOrderCountByShopId: async (shopId) => {
		try {
			const response = await api.get(`/order/shop/count/${shopId}`);
			return response.data.count || 0;
		} catch (error) {
			console.error(
				'Lỗi khi lấy số lượng đơn hàng của shop:',
				error.response?.data || error.message,
			);
			throw error;
		}
	},
	getRecentOrdersByShop: async (shopId) => {
		try {
			const response = await api.get(`/order/shop/order_recent/${shopId}`);
			console.log("Đơn hàng gần đây: ", response);
			return response;
		} catch (error) {
			console.error(
				'Lỗi khi lấy đơn hàng và thống kê theo shop:',
				error.response?.data || error.message
			);
			throw error;
		}
	},

	getDailyStatsInMonth: async (shopId, date) => {
		try {
			const response = await api.get(`/order/shop/${shopId}/daily-stats-in-month`, {
				params: { date },
			});
			return response.data;
		} catch (error) {
			console.error('Lỗi khi lấy thống kê theo ngày trong tháng:', error.response?.data || error.message);
			throw error;
		}
	},



	getDashboardStats: async (shopId, timeRange) => {
		try {
			const response = await api.get(`/order/shop/${shopId}/dashboard`, {
				params: { timeRange }
			});
			return response.data;
		} catch (error) {
			console.error('Lỗi khi lấy thống kê dashboard:', error.response?.data || error.message);
			throw error;
		}
	},

	getRevenueSummary: async (shopId, period) => {
		try {
			const response = await api.get(`/order/shop/${shopId}/revenue-summary`, {
				params: { period }
			});
			return response.data;
		} catch (error) {
			console.error('Lỗi khi lấy tổng quan doanh thu:', error.response?.data || error.message);
			throw error;
		}
	}
	// sendOrderSuccessEmail: async (orderId) => {
	// 	try {
	// 		const response = await api.post('/email/send-order-success-email', {
	// 			order_id: orderId,
	// 		});
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error("Lỗi gửi email xác nhận:", error.response?.data || error.message);
	// 		throw error;
	// 	}
	// },

};
