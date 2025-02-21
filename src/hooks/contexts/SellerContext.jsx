import React, { createContext, useState, useContext, useEffect } from 'react';
import { shopService } from '../../services/shopService';
import { useAuth } from './AuthContext';

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
    const [shops, setShops] = useState([]);
    const [shop, setShop] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchShopsBySeller = async (seller_id) => {
            try {
                const response = await shopService.getShopsByUser(seller_id);
                setShops(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchShopsBySeller(user.id);
    }, []);

    return (
        <SellerContext.Provider value={{
            shops
        }}>
            {children}
        </SellerContext.Provider>
    );
};

export const useSeller = () => {
    const context = useContext(SellerContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};