import api from './axios';

const userService = {
    getAllUsers: async () => {
        try {
            const response = await api.get('/user');
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng", error);
            throw error;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await api.get(`/user/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng", error);
            throw error;
        }
    },

    createUser: async (user) => {
        try {
            const response = await api.post('/user', user);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo người dùng", error);
            throw error;
        }
    },

    updateUser: async (id, userData) => {
        try {
            const response = await api.put(`/user/update/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng", error);
            throw error;
        }
    },

    uploadAvatar: async (userId, formData) => {
        try {
            const response = await api.post(`/user/${userId}/upload-avatar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi upload avatar", error);
            throw error;
        }
    }
};

export default userService;
