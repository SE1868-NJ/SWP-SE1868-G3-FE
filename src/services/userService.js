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

    updateUser: async (id, userData, file = null) => {
        try {
            const formData = new FormData();
            
            Object.keys(userData).forEach(key => {
                formData.append(key, userData[key]);
            });
            
            if (file) {
                formData.append("avatar", file);
            }
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
            const response = await api.put(`/user/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
                        
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin người dùng và avatar:", error.message);
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            }
            throw error;
        }
    }
};

export default userService;
