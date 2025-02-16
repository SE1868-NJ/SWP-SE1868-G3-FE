import api from './axios';

export const productService = {

    // Get all products
    getProducts: async () => {
        try {
        const response = await api.get('/shop/product/get_list_product');
        return response.data;
        } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
        }
    },
    
    // Get product by id
    getProduct: async (productId) => {
        try {
        const response = await api.get(`/shop/product/get_product/${productId}`);
        return response.data;
        } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
        }
    },
    
    
    // Create product
    createProduct: async (productData) => {
        try {
        const response = await api.post('/shop/product/create_product', productData);
        return response.data;
        } catch (error) {
        console.error('Error creating product:', error);
        throw error;
        }
    },
    
    // Update product
    updateProduct: async (productId, productData) => {
        try {
        const response = await api.put(`/shop/product/update_product/${productId}`, productData);
        return response.data;
        } catch (error) {
        console.error('Error updating product:', error);
        throw error;
        }
    },
    
    // Delete product
    deleteProduct: async (productId) => {
        try {
        const response = await api.delete(`/shop/product/delete_product/${productId}`);
        return response.data;
        } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
        }
    }
};