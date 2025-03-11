import api from './axios';

export const addressService = {
    getAll: async () => {
        const response = await api.get('/addresses');
        return response.data.data;
    },

    addNew: async (newAddress) => {
        const response = await api.post('/addresses', newAddress);
        return response;
    },

    update: async (addressId, updatedAddress) => {
        const response = await api.put(`/addresses/${addressId}`, updatedAddress);
        return response;
    },

    delete: async (addressId) => {
        const response = await api.delete(
            `/addresses/${addressId}`
        );
        return response;
    },

    getAllProvince: async () => {
        const response = await api.get('/address/provinces');
        return response;
    },

    getDistricByProvince: async (provinceId) => {
        const response = await api.get(`/address/districts/${provinceId}`);
        return response;
    },

    getWardsByDistrict: async (districtId) => {
        const response = await api.get(`/address/wards/${districtId}`);
        return response;
    }
};
