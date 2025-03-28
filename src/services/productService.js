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
			return response;
		} catch (error) {
			throw error;
		}
	},

	getCountCart: async (user_id) => {
		try {
			const response = await api.get(
				`/shop/cart/get_count_cart_by_user/${user_id}`,
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	getProductById: async (product_id) => {
		try {
			const response = await api.get(
				`/shop/product/get_product_by_id/${product_id}`,
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	getProductByName: async (product_name) => {
		try {
			const response = await api.get(
				`/shop/product/get_product_by_name/${product_name}`,
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getTopSearchedProducts: async (searchCount = 0, limit = 4) => {
		try {
			const url = `/shop/product/get_top_searched_products?search_count=${searchCount}&limit=${limit}`;
			const response = await api.get(url);
			const products = response.data.data || response.data || [];
			if (!products.length) {
				console.warn("No top searched products returned from API");
			}
			return products;
		} catch (error) {
			console.error("API error:", error.response?.data || error.message);
			throw error;
		}
	}

	
	

};
