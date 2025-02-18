import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(null);

    const openChat = (conversationId = null) => {
        setIsOpen(true);
        if (conversationId) {
            setSelectedConversation(conversationId);
        }
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