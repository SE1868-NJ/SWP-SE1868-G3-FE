import api from './axios';

export const productService = {
    getListCategory: async () => {
        try {
            const response = await api.get('/shop/category/get_list_category');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    getListProduct: async () => {
        try {
            const response = await api.get('/shop/product/get_list_product');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
};