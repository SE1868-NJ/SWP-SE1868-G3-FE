import api from './axios';

const userService = {
    getAllUsers: async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng", error);
            throw error;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng", error);
            throw error;
        }
    },

    createUser: async (user) => {
        try {
            const response = await api.post('/users', user);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo người dùng", error);
            throw error;
        }
        },

    updateUser: async (id, userData) => {
        try {
            const response = await api.put(`/users/update/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng", error);
            throw error;
        }
       }
};
export default userService;