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

    updateUser: async (id, userData, avatarFile = null) => {
        try {
            const formData = new FormData();

            // Thêm các trường dữ liệu người dùng vào FormData
            Object.keys(userData).forEach(key => {
                // Bỏ qua trường avatar từ userData vì sẽ sử dụng file
                if (key !== 'avatar') {
                    formData.append(key, userData[key] || '');
                }
            });

            // Thêm file avatar nếu có
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }

            // Gửi request với đúng định dạng URL và method như shop
            const response = await api.post(`/user/${id}/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Đảm bảo trả về cấu trúc phản hồi chuẩn
            return {
                success: true,
                data: response.data,
                message: "Cập nhật thành công"
            };
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin người dùng:", error);

            // Trả về cấu trúc lỗi chuẩn
            return {
                success: false,
                message: error.response?.data?.message || "Đã xảy ra lỗi khi cập nhật"
            };
        }
    }
};

export default userService;