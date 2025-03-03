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

    updateUser: async (id, userData) => {
        try {
            const response = await api.put(`/user/update/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
            throw error;
        }
    },
    

    uploadAvatar: async (id, file) => {
        try {
            if (!file) throw new Error("No file provided");
    
            const formData = new FormData();
            formData.append("avatar", file);
    
            const response = await api.post(`/user/upload/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            console.log("Full response:", response);
    
            // Dùng response trực tiếp thay vì response.data
            if (!response || !response.avatar) {
                throw new Error("Response không chứa avatar hoặc không hợp lệ");
            }
    
            // Trả về response thay vì response.data
            return response;
        } catch (error) {
            console.error("Lỗi khi upload avatar:", error.message);
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            }
            throw error;
        }
    }
    
    
    
    
};

export default userService;
