import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { authService } from '../../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shop_id, setShopId] = useState(null);

    // Kiểm tra token trong localStorage khi khởi động
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            const userData = localStorage.getItem('userData');

            if (token) {
                setIsAuthenticated(true);
                if (userData) {
                    // Ưu tiên dùng userData từ localStorage nếu có
                    const parsedUserData = JSON.parse(userData);
                    setUser(prev => ({
                        ...prev,
                        ...JSON.parse(storedUser || '{}'),
                        ...parsedUserData
                    }));
                } else if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    try {
                        const userData = await authService.getCurrentUser();
                        setUser(userData);
                        localStorage.setItem('user', JSON.stringify(userData));
                    } catch (error) {
                        console.error('Error getting user data:', error);
                        logout();
                    }
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    // Các hàm xử lý auth
    const login = (userData, token, shop_id) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('shop_id', shop_id); 
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
        setCartCount(0);
        localStorage.removeItem('userData'); // Xóa cả userData khi logout
    };

    const getCountCart = async (userId) => {
        if (!userId) return;
        try {
            const response = await productService.getCountCart(userId);
            setCartCount(response);
        } catch (error) {
            console.error('Error getting cart count:', error);
        }
    };

    useEffect(() => {
        const handleCartUpdated = () => {
            if (user && user.id) {
                getCountCart(user.id);
            }
        };

        const handleUserDataChanged = () => {
            try {
                const storedUserData = localStorage.getItem('userData');
                if (storedUserData) {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUser(prev => ({
                        ...prev,
                        ...parsedUserData
                    }));
                }
            } catch (error) {
                console.error('Error parsing userData:', error);
            }
        };

        window.addEventListener('cart-updated', handleCartUpdated);
        window.addEventListener('userDataChanged', handleUserDataChanged);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdated);
            window.removeEventListener('userDataChanged', handleUserDataChanged);
        };
    }, [user]);

    useEffect(() => {
        if (user && user.id) {
            getCountCart(user.id);
        }
    }, [user, showToast]);

    const handleAddCart = async (productId, userId) => {
        try {
            if (!isAuthenticated) {
                setToastMessage('Vui lòng đăng nhập để thêm vào giỏ hàng!');
                setToastVariant('warning');
                setShowToast(true);
                return false;
            }
            const response = await productService.addToCart(productId, userId || user.id);
            if (response.status === 'success') {
                setToastMessage('Thêm vào giỏ hàng thành công!');
                setToastVariant('success');
                setShowToast(true);

                const event = new CustomEvent('cart-updated');
                window.dispatchEvent(event);
                return true;
            }
            return false;
        } catch (error) {
            setToastMessage('Có lỗi xảy ra khi thêm vào giỏ hàng');
            setToastVariant('danger');
            setShowToast(true);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            cartCount,
            handleAddCart,
            showToast,
            toastMessage,
            toastVariant,
            setShowToast,
            user,
            setUser, // Expose setUser so Profile component can update it
            loading,
            login,
            logout,
            shop_id,
            setShopId
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

// Hook để thực hiện các hành động cần điều hướng
export const useAuthActions = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    // Đăng nhập và điều hướng
    const loginAndRedirect = (userData, token, shop_id, redirectPath = '/') => {
        auth.login(userData, token, shop_id);
        navigate(redirectPath);
    };

    // Đăng xuất và điều hướng
    const logoutAndRedirect = (redirectPath = '/login') => {
        auth.logout();
        navigate(redirectPath);
    };

    return {
        ...auth,
        loginAndRedirect,
        logoutAndRedirect
    };
};