import api from './axios';

export const productService = {
	// Ensure we use POST for getProducts with body parameters
	getProducts: async (params) => {
		try {
			console.log("Calling API with params:", params);
			const response = await api.post(`/shop/product/get_list_product`, params);
			return response.data;
		} catch (error) {
			console.error("API error in getProducts:", error.response?.data || error.message);
			throw error;
		}
	},

	// Get all categories
	getCategories: async () => {
		try {
			const response = await api.get(`/shop/category/get_list_category`);
			console.log("Categories API response:", response.data);
			return response.data;
		} catch (error) {
			console.error("Error fetching categories:", error.response?.data || error.message);
			throw error;
		}
	},

	// Get all products
	getAllProducts: async () => {
		try {
			const response = await api.get(`/shop/product`);
			return response.data;
		} catch (error) {
			console.error("Error fetching all products:", error.response?.data || error.message);
			throw error;
		}
	},

	// Get products by shop
	getProductsByShop: async (shopId) => {
		try {
			const response = await api.get(`/shop/${shopId}/products`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching products for shop ${shopId}:`, error.response?.data || error.message);
			throw error;
		}
	},

	// Add to cart
	addToCart: async (product_id, user_id) => {
		try {
			const response = await api.post(`/shop/cart/add_to_cart`, {
				product_id,
				user_id,
			});
			return response;
		} catch (error) {
			console.error("Error adding to cart:", error.response?.data || error.message);
			throw error;
		}
	},

	// Get cart count
	getCountCart: async (user_id) => {
		try {
			const response = await api.get(
				`/shop/cart/get_count_cart_by_user/${user_id}`,
			);
			return response.data;
		} catch (error) {
			console.error("Error getting cart count:", error.response?.data || error.message);
			throw error;
		}
	},

	// Get product by ID
	getProductById: async (product_id) => {
		try {
			const response = await api.get(
				`/shop/product/get_product_by_id/${product_id}`,
			);
			return response.data;
		} catch (error) {
			console.error("Error getting product by ID:", error.response?.data || error.message);
			throw error;
		}
	},

	// Get product by name
	getProductByName: async (product_name) => {
		try {
			const response = await api.get(
				`/shop/product/get_product_by_name/${product_name}`,
			);
			return response.data;
		} catch (error) {
			console.error("Error getting product by name:", error.response?.data || error.message);
			throw error;
		}
	},

	// Get top searched products
	getTopSearchedProducts: async (searchCount = 0, limit = 4) => {
		try {
			const url = `/shop/product/get_top_searched_products?limit=${limit}`;
			const response = await api.get(url);
			const products = response.data || [];
			if (!products.length) {
				console.warn("No top searched products returned from API");
			}
			return products;
		} catch (error) {
			console.error("Error getting top searched products:", error.response?.data || error.message);
			throw error;
		}
	},

	// Get top products by revenue
	getTopProductsByRevenue: async (limit = 5) => {
		try {
			const url = `/shop/product/top-products?sortBy=revenue&limit=${limit}`;
			const response = await api.get(url);
			return response.data || [];
		} catch (error) {
			console.error("Error getting top products by revenue:", error.response?.data || error.message);
			throw error;
		}
	},

	// Get top products by quantity
	getTopProductsByQuantity: async (limit = 5) => {
		try {
			const url = `/shop/product/top-products?sortBy=quantity&limit=${limit}`;
			const response = await api.get(url);
			return response.data || [];
		} catch (error) {
			console.error("Error getting top products by quantity:", error.response?.data || error.message);
			throw error;
		}
	},

	getProductsByCategory: async (categoryName) => {
		try {
			console.log("Fetching products for category:", categoryName);
			const response = await api.get(`/shop/product/category/${encodeURIComponent(categoryName)}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching products by category:", error.response?.data || error.message);
			throw error;
		}
	},

};