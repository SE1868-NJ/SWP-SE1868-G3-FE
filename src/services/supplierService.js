import api from './axios';

const supplierService = {
  getAllSupplier: async () => {
    try {
      const response = await api.get(`/supplier/`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhà cung cấp:", error);
      throw error;
    }
  },

  getSupplierById: async (supplier_id) => {
    try {
      const response = await api.get(`/supplier/${supplier_id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết nhà cung cấp:", error);
      throw error;
    }
  },

  createSupplier: async (supplierData) => {
    try {
      const response = await api.post(`/supplier/create`, supplierData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm nhà cung cấp:", error);
      throw error;
    }
  },

  updateSupplier: async (supplier_id, updatedData) => {
    try {
      const response = await api.post(`/supplier/update/${supplier_id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật nhà cung cấp:", error);
      throw error;
    }
  },

  deleteSupplier: async (supplier_id) => {
    try {
      const response = await api.post(`/supplier/${supplier_id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi xóa nhà cung cấp:", error);
      throw error;
    }
  }
};

export default supplierService;
