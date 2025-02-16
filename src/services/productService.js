import api from './axios';

export const productService = {
    getProducts: async (params) => {
        try {
            const response = await api.post(`/shop/product/get_list_product`, params);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};