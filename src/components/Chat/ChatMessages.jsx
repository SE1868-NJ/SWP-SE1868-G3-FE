import React from 'react';

const ChatMessages = ({ messages, userId }) => {
  return (
    <div className="chat-messages p-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`d-flex mb-3 ${
            message.senderId === userId ? 'justify-content-end' : 'justify-content-start'
          }`}
        >
          <div
            className={`p-3 rounded-3 ${
              message.senderId === userId
                ? 'bg-primary text-white'
                : 'bg-light'
            }`}
            style={{ maxWidth: '70%' }}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
