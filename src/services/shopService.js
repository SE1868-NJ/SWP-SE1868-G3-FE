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
					'Content-Type': 'multipart/form-data'
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

	getProductsByShopAndCategory: async (shopId, params = {}) => {
		try {
			const { page = 1, limit = 10, category = null, sortBy = 'Phổ Biến', priceDirection = '' } = params;
			let url = `/shop/${shopId}/products?page=${page}&limit=${limit}`;

			if (category) {
				url += `&category=${encodeURIComponent(category)}`;
			}
			let sort = 'newest';
			switch (sortBy) {
				case 'Phổ Biến':
					sort = 'popular';
					break;
				case 'Mới Nhất':
					sort = 'newest';
					break;
				case 'Bán Chạy':
					sort = 'bestseller';
					break;
				case 'Giá':
					sort = priceDirection === 'asc' ? 'price_asc' : 'price_desc';
					break;
			}
			url += `&sort=${sort}`;

			const response = await api.get(url);
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
	},

	getDeliveryOrders: async (shopId) => {
		try {
			const response = await api.get(`/shop/order/get_delivery_order_by_shop/${shopId}`);
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

	getSellerProducts: async (shopId, params) => {
		try {
			if (!shopId) {
				return { products: [] };
			}

			const response = await api.get(`/shop/all_products/${shopId}`, { params });

			const result = {
				products: response.data.products || [],
				total: response.data.total || 0
			};

			return result;
		} catch (error) {
			console.error('API error:', error.response || error);
			throw new Error(`Error getting seller products: ${error.message}`);
		}
	},

	createProduct: async (productData) => {
		try {
			const response = await api.post('/shop/product/create', productData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Cập nhật sản phẩm
	updateProduct: async (productId, formData) => {
		try {
			const response = await api.put(`/shop/product/update/${productId}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Xóa sản phẩm
	deleteProduct: async (productId) => {
		try {
			const response = await api.post(`/shop/product/delete/${productId}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	getCategory: async () => {
		try {
			const response = await api.get('/shop/category/get_list_category');
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	getAllSuppliers: async () => {
		try {
			const response = await api.get('/supplier/get_list_supplier');
			return response.data;
		} catch (error) {
			throw error;
		}
	},

};