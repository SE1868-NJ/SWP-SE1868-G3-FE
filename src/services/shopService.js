import api from './axios';

export const shopService = {
    getShopsByUser: async (user_id) => {
        try {
            const response = await api.get(`/shop/get_shop_by_user/${user_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};