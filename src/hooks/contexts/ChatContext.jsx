import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { chatService } from '../../services/chatService';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(null);

    const openChat = (shopId = null) => {
        setIsOpen(true);
        if (shopId) {
            fetchProduct(user.id, shopId);
        }
    };
    const fetchProduct = async (userId, shopId) => {
        const response = await chatService.getConversation(userId, shopId);
        setSelectedConversation(response.conversation_id);
    };

    const closeChat = () => {
        setIsOpen(false);
        setSelectedConversation(null);
    };

    const value = {
        isOpen,
        selectedConversation,
        openChat,
        closeChat,
        setSelectedConversation,
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};