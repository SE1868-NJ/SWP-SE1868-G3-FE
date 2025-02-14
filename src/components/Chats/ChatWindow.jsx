import React from 'react';
import Message from './Message';

const ChatWindow = ({ messages, userId, chatRef, onScroll }) => {
  return (
    <div 
      className="flex-grow-1 overflow-auto p-2"
      ref={chatRef}
      onScroll={onScroll}
      style={{ height: '300px' }}
    >
      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg}
          isOwnMessage={msg.sender_id === userId}
        />
      ))}
    </div>
  );
};

export default ChatWindow;