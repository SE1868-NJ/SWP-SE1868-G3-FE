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
};
