import api from './axios';

export const paymentService = {
    getUrlVNPay: async (payload) => {
        try {
            const response = await api.post('/payment/create_payment_url', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};