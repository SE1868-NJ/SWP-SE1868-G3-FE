import React, { createContext, useState, useContext, useEffect } from 'react';
import { productService } from '../../services/productService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');
    const [user, setUser] = useState(
        {
            id: 15,
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
    const getCountCart = async (userId) => {
        try {
            const response = await productService.getCountCart(userId);
            setCartCount(response);
        } catch (error) {
            console.error('Error getting cart count:', error);
        }
    };

    useEffect(() => {
        const handleCartUpdated = () => {
            getCountCart(user.id);
        };
        window.addEventListener('cart-updated', handleCartUpdated);
        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
        };
    }, [user.id]);

    useEffect(() => {
        getCountCart(user.id);
    }, [user.id, showToast]);

    const handleAddCart = async (productId, mockUserId) => {
        try {
            const response = await productService.addToCart(productId, mockUserId);
            if (response.status === 'success') {
                setToastMessage('Thêm vào giỏ hàng thành công!');
                setToastVariant('success');
                setShowToast(true);

                const event = new CustomEvent('cart-updated');
                window.dispatchEvent(event);
            }
        } catch (error) {
            setToastMessage('Có lỗi xảy ra khi thêm vào giỏ hàng');
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <AuthContext.Provider value={{
            // isAuthenticated,
            cartCount,
            handleAddCart,
            showToast,
            toastMessage,
            toastVariant,
            setShowToast,
            user,
            setUser
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