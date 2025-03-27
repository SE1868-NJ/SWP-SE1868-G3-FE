/* eslint-disable no-useless-catch */
import api from './axios';

export const shopService = {

	//Seller
	getShopsByUser: async (user_id) => {
		try {
			const response = await api.get(`/shop/get_shop_by_user/${user_id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	updateShop: async (shopId, formData) => {
		try {
			const response = await api.post(`/shop/${shopId}/update`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'  // Changed to multipart/form-data for file upload
				}
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	//Customer
	getShopHomepage: async (shopId) => {
		try {
			const response = await api.get(`/shop/${shopId}/homepage`);
			return response;
		} catch (error) {
			throw error;
		}
	},

	getProductsByShopAndCategory: async (shopId) => {
		try {
			const response = await api.get(`/shop/${shopId}/products`);
			return response;
		} catch (error) {
			throw error;
		}
	},

    getFeedbacksByShop: async (shopId, startDate, endDate) => {
        try {
            const params = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
    
            const response = await api.get(`/shop/feedbacks/${shopId}`, { params });
            console.log('Feedbacks fetched:', response.data);

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getNewOrderByShop: async (shopId) => {
        try {
            const response = await api.get(`/shop/order/get_new_order_by_shop/${shopId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getProcessingOrderByShop: async (shopId) => {
        try {
            const response = await api.get(`/shop/order/get_processing_order_by_shop/${shopId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getCompletedOrderByShop: async (shopId) => {
        try {
            const response = await api.get(`/shop/order/get_completed_order_by_shop/${shopId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getCancelledOrderByShop: async (shopId) => {
        try {
            const response = await api.get(`/shop/order/get_cancelled_order_by_shop/${shopId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    updateStatus: async (orderId, status) => {
        try {
            const response = await api.post(`/shop/order/update_order_status/${orderId}`, { status });
            return response;
        } catch (error) {
            throw error;
        }
    }

};