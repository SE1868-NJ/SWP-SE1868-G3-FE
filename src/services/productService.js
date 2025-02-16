import api from './axios';

export const productService = {
    getProducts: async (params) => {
        try {
            const response = await api.post(`/shop/product/get_list_product`, params);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addToCart: async (product_id, user_id) => {
        try {
            const response = await api.post(`/shop/cart/add_to_cart`, {
                product_id,
                user_id,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};