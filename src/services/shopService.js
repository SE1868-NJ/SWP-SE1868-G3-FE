import api from './axios';

export const shopService = {
    getShopsByUser: async (user_id) => {
        try {
            const response = await api.get(`/shop/get_shop_by_user/${user_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    // shopService.js
    getShopHomepage: async (shopId) => {
        try {
            console.log(`Calling API: /shop/${shopId}/homepage`);
            const response = await api.get(`/shop/${shopId}/homepage`);
            console.log("Raw API response:", response);

            // Trả về toàn bộ response để xử lý trong component
            return response;
        } catch (error) {
            console.error("Error in getShopHomepage:", error);
            throw error;
        }
    },

    getProductsByShopAndCategory: async (shopId) => {
        try {
            console.log(`Gọi API: /shop/${shopId}/products`);
            const response = await api.get(`/shop/${shopId}/products`);

            // Log response chi tiết
            console.log("API response type:", typeof response);
            console.log("API response:", response);

            // Trả về đúng response (đã được xử lý bởi interceptor)
            return response;  // Không cần .data nữa vì interceptor đã xử lý
        } catch (error) {
            console.error("Lỗi API:", error);
            throw error;
        }
    },

    checkFollowStatus: async (userId, shopId) => {
        try {
            const response = await api.get(`/shop/follow-status/${userId}/${shopId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    toggleFollowShop: async (userId, shopId) => {
        try {
            const response = await api.post('/shop/toggle-follow', { userId, shopId });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};