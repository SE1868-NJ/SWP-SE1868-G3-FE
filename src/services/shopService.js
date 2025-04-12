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
    // follower
    toggleFollowShop: async (shopId, userId) => {
        try {
            const response = await api.post(`/shop/followers/toggle`, {
                shop_id: shopId,
                user_id: userId,
            });
            return response.data; // { message, following }
        } catch (error) {
            throw error;
        }
    },
    getFollowersByShopId: async (shopId) => {
        try {
          const response = await api.get(`/shop/${shopId}/followers`);
          return response.data;
        } catch (error) {
          console.error('Error fetching followers:', error);
          throw error.response?.data || { status: 'error', message: 'Unknown error' };
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
		  const token = localStorage.getItem('token'); // hoặc từ context
		  const response = await api.get('/supplier/get_list_supplier', {
			headers: {
			  Authorization: `Bearer ${token}`,
			},
		  });
		  return response.data;
		} catch (error) {
		  throw error;
		}
	  },
    
      // Gửi email theo mẫu (template)
      sendTemplateEmailToFollowers: async (shopId, templateType) => {
        try {
          const response = await api.post(`/email/send-template-email-to-followers`, {
            shop_id: shopId,
            template_type: templateType,
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      
      getAllEmailTemplates: async () => {
        try {
          const response = await api.get('/email/templates');
          return response.data;
        } catch (error) {
          throw error;
        }
      },
       // Tạo email template mới
    createEmailTemplate: async (templateData) => {
        try {
            const response = await api.post('/email/templates', templateData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Cập nhật email template
    updateEmailTemplate: async (templateId, templateData) => {
        try {
            const response = await api.put(`/email/templates/${templateId}`, templateData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Xóa email template
    deleteEmailTemplate: async (templateId) => {
        try {
            const response = await api.delete(`/email/templates/${templateId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // lấy danh sách loại email
    getEmailTypes: async () => {
        try {
          const response = await api.get('/email/email-types');
          return response.data;
        } catch (error) {
          throw error;
        }
      },

};