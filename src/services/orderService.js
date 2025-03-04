import api from './axios';

export const orderService = {
    createOrder: async (dataOrder) => {
        const response = await api.post('/order/create_order',dataOrder);
        return response;
    },
};