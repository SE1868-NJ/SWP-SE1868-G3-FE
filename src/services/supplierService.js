import api from './axios';

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

};

export default supplierService;
