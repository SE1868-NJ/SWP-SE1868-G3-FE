import api from './axios';

const orderService = {
    // Tạo đơn hàng mới
    createOrder: async (orderData) => {
        try {
            const response = await api.post('/order/create_order', orderData);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng", error);
            throw error;
        }
    },

    // Lấy danh sách đơn hàng theo userId
    getOrdersByUserId: async (userId) => {
        try {
            const response = await api.get(`/order/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng", error);
            throw error;
        }
    },

    // Lấy danh sách đơn hàng đã hủy theo userId
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

    // Hủy đơn hàng
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

export default orderService;