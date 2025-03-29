import React, { createContext, useState, useContext, useEffect } from 'react';
import { shopService } from '../../services/shopService';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
    const { user } = useAuth();
    const [shops, setShops] = useState([]);
    const [currentShop, setCurrentShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch shops when user is available
    useEffect(() => {
        const fetchShopsBySeller = async () => {
            if (!user || !user.id) return;

            try {
                setLoading(true);
                const response = await shopService.getShopsByUser(user.id);
                setShops(response);

                // If there's at least one shop and no current shop selected,
                // set the first one as current
                if (response.length > 0 && !currentShop) {
                    setCurrentShop(response[0]);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching shops:", error);
                setLoading(false);
            }
        };

        fetchShopsBySeller();
    }, [user]);

    // Function to select a shop and navigate to its dashboard
    const selectShop = (shopId) => {
        const shop = shops.find(s => s.id === shopId);
        if (shop) {
            setCurrentShop(shop);
            navigate(`/seller/${shopId}/dashboard`);
        }
    };

    return (
        <SellerContext.Provider value={{
            shops,
            currentShop,
            loading,
            selectShop,
            setCurrentShop
        }}>
            {children}
        </SellerContext.Provider>
    );
};

export const useSeller = () => {
    const context = useContext(SellerContext);
    if (!context) {
        throw new Error('useSeller must be used within a SellerProvider');
    }
    return context;
};