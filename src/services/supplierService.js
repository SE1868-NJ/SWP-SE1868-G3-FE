import api from './axios';

const addressCache = {
  provinces: null,
  districts: {},
  wards: {}
};

const supplierService = {
  getAllSupplier: async () => {
    try {
      const response = await api.get(`/supplier/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSuppliers: async (params) => {
    try {
      const response = await api.get(`/supplier/get_list_supplier`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSupplierById: async (supplier_id) => {
    try {
      const response = await api.get(`/supplier/${supplier_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createSupplier: async (supplierData) => {
    try {
      const response = await api.post(`/supplier/create`, supplierData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateSupplier: async (supplier_id, updatedData) => {
    try {
      const response = await api.post(`/supplier/update/${supplier_id}`, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteSupplier: async (supplier_id) => {
    try {
      const response = await api.post(`/supplier/${supplier_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProvinces: async () => {
    try {
      if (!addressCache.provinces) {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        addressCache.provinces = await response.json();
      }
      return addressCache.provinces;
    } catch (error) {
      throw error;
    }
  },

  getDistricts: async (provinceCode) => {
    try {
      if (!addressCache.districts[provinceCode]) {
        const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        const data = await response.json();
        addressCache.districts[provinceCode] = data.districts || [];
      }
      return addressCache.districts[provinceCode];
    } catch (error) {
      throw error;
    }
  },

  getWards: async (districtCode) => {
    try {
      if (!addressCache.wards[districtCode]) {
        const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        const data = await response.json();
        addressCache.wards[districtCode] = data.wards || [];
      }
      return addressCache.wards[districtCode];
    } catch (error) {
      throw error;
    }
  },

  // Method tiện ích để xóa cache nếu cần
  clearAddressCache: () => {
    addressCache.provinces = null;
    addressCache.districts = {};
    addressCache.wards = {};
  }
};

export default supplierService;
