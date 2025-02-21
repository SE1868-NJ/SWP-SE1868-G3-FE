import api from './axios';

export const chatService = {
  // Get conversations for a user
  getConversations: async (userId) => {
    try {
      const response = await api.get(`/conversation/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  getConversationsByShop: async (shopId) => {
    try {
      const response = await api.get(`/conversation/shop/${shopId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  getConversation: async (userId, shopId) => {
    try {
      const response = await api.get(`/conversation/${userId}/${shopId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  },

  // Get messages for a conversation
  getMessages: async (conversationId, limit = 20, offset = 0) => {
    try {
      const response = await api.get(`/message/getMessage/${conversationId}`, {
        params: { limit, offset }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Upload file
  uploadFile: async (data) => {
    try {
      const response = await api.post('/file/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Send message
  sendMessage: async (messageData) => {
    try {
      const response = await api.post('/message/send', messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};