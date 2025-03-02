import api from './axios';

const cartService = {
    getCartsByUserId: async (userId) => {
        try {
            const response = await api.get(`/shop/cart/get_cart_by_user/${userId}`);
            if (response.data && Array.isArray(response.data)) {
                return response.data;
            } else if (response.data.status === 'success') {
                return response.data.data || [];
            }
            throw new Error('Dữ liệu không hợp lệ từ server');
        } catch (error) {
            throw new Error('Không thể lấy dữ liệu giỏ hàng từ server');
        }
    },

    updateCartQuantity: async (cartId, quantity) => {
        try {
            const response = await api.post(`/shop/cart/update_quantity/${cartId}`, { quantity });
            return response.data.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật số lượng giỏ hàng:", error);
            throw error;
        }
    },

    removeCartItem: async (cartId) => {
        try {
            const response = await api.post(`/shop/cart/remove_item/${cartId}`);
            return response.data.data;
        } catch (error) {
            console.error("Lỗi khi xóa mục giỏ hàng:", error);
            throw error;
        }
    },

    removeMultipleCartItems: async (cartIds) => {
        try {
            const response = await api.post(`/shop/cart/remove_multiple`, { cartIds });
            return response.data.data;
        } catch (error) {
            console.error("Lỗi khi xóa nhiều mục giỏ hàng:", error);
            throw error;
        }
    },

    applyVoucher: async (userId, storeId, voucherCode) => {
        try {
            const response = await api.post(`/shop/cart/apply_voucher`, { userId, storeId, voucherCode });
            if (response.data.status === 'success') {
                return response.data.data;
            }
            throw new Error(response.data.data?.message || 'Mã voucher không hợp lệ.');
        } catch (error) {
            console.error('Lỗi khi áp dụng voucher:', error);
            throw error;
        }
    },

    removeVoucher: async (cartId, voucherCode) => {
        try {
            const response = await api.post('/shop/cart/remove_voucher', { cartId, voucherCode });
            if (response.data.status === 'success') {
                return response.data.data;
            }
            throw new Error(response.data.message || 'Không thể xóa voucher.');
        } catch (error) {
            console.error('Lỗi khi xóa voucher:', error);
            throw error;
        }
    }

};

export default cartService;