import api from './axios';

export const orderService = {
	createOrder: async (dataOrder) => {
		const response = await api.post('/order/create_order', dataOrder);
		return response;
	},

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

	getCompletedOrders: async (userId) => {
		try {
			const response = await api.get(`/order/completed/${userId}`);
			console.log('API response for completed orders:', typeof response.data);
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
            console.log('API response in orderService:', response.data);
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
    }
};
