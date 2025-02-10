import React from 'react';

const ChatHeader = ({ conversation }) => {
  if (!conversation) return null;
  
  return (
    <div className="p-4 border-b bg-white">
      <div className="flex items-center">
        <img
          src={conversation.shop.avatar || 'https://via.placeholder.com/40'}
          alt={conversation.shop.name}
          className="w-10 h-10 rounded-full"
        />
        <h3 className="ml-3 font-medium">{conversation.shop.name}</h3>
      </div>
    </div>
  );
};

export default ChatHeader;