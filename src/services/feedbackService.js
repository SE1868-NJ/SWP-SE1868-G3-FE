import api from './axios';

export const feedbackService = {
    getFeedbackByProductId: async (product_id) => {
        try {
            const response = await api.get(`/shop/product/get_feedbacks_by_product/${ product_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createFeedback: async (formData) => {
        try {
          const response = await api.post('/feedback/create', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error creating feedback:', error);
          throw error;
        }
      },
    
};