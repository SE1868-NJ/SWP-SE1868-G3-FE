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

};