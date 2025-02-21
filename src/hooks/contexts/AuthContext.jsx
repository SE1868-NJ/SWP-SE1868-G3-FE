import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(
        {
            id: 16,
            name: "Trần Xuân Đông",
            email: "dongtx04@gmail.com",
            avatar: "",
            gender: "male",
            phone: "0987654321",
            address: "Hà Nội",
        }
    );
    const [loading, setLoading] = useState(true);

    // Kiểm tra token trong localStorage khi khởi động
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setIsAuthenticated(true);
    //         // Fetch thông tin user
    //         fetchUserInfo(token);
    //     }
    //     setLoading(false);
    // }, []);

    // Các hàm xử lý auth
    // const login = async (credentials) => {
    //     try {
    //         const response = await authService.login(credentials);
    //         const { token, user } = response;
            
    //         localStorage.setItem('token', token);
    //         setIsAuthenticated(true);
    //         setUser(user);
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    // const logout = () => {
    //     localStorage.removeItem('token');
    //     setIsAuthenticated(false);
    //     setUser(null);
    // };

    return (
        <AuthContext.Provider value={{
            // isAuthenticated,
            user,
            // loading,
            // login,
            // logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};