import api from './axios';

export const addressService = {
    getAddressesByUserId: async (userId) => {
        const response = await api.get(`/address/addresses/${userId}`);
        return response;
    },

    createAddress: async (newAddress) => {
        const response = await api.post('/address/create-address', newAddress);
        return response;
    },

    update: async (addressId, updatedAddress) => {
        const response = await api.put(`/address/${addressId}`, updatedAddress);
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
