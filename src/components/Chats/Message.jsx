import React from 'react';

const Message = ({ message, isOwnMessage }) => {
  return (
    <div
      className={`d-flex mb-2 ${
        isOwnMessage ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        className={`p-2 ${
          isOwnMessage ? "bg-danger text-white" : "bg-light"
        }`}
        style={{ 
          maxWidth: '80%', 
          wordBreak: 'break-word',
          borderRadius: isOwnMessage ? '15px 15px 0 15px' : '15px 15px 15px 0'
        }}
      >
        {message.message_type === 'file' ? (
          <img 
            src={message.media_url} 
            alt="Attachment" 
            className="img-fluid rounded"
            style={{ maxWidth: '200px' }}
          />
        ) : (
          message.message_text
        )}
      </div>
    </div>
  );
};

export default Message;