import React, { useState } from 'react';
import ImageModal from '../Modals/ImageModal';

const Message = ({ message, isOwnMessage }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className={`d-flex mb-2 ${isOwnMessage ? "justify-content-end" : "justify-content-start"
          }`}
      >
        {message.message_type === 'file' ? (
          <div
            style={{
              maxWidth: '70%',
              borderRadius: isOwnMessage ? '15px 15px 0 15px' : '15px 15px 15px 0',
              overflow: 'hidden'
            }}
          >
            <img
              src={message.media_url}
              alt="Attachment"
              className="img-fluid"
              style={{
                maxWidth: '350px',
                maxHeight: '300px',
                objectFit: 'contain',
                cursor: 'pointer',
                display: 'block'
              }}
              onClick={() => setShowModal(true)}
            />
          </div>
        ) : (
          <div
            className={`p-2 ${isOwnMessage ? "bg-primary text-white" : "bg-light"
              }`}
            style={{
              maxWidth: '70%',
              borderRadius: isOwnMessage ? '15px 15px 0 15px' : '15px 15px 15px 0',
              wordBreak: 'break-word'
            }}
          >
            <p className="mb-0">{message.message_text}</p>
          </div>
        )}
      </div>

      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imageUrl={message.media_url}
      />
    </>
  );
};


export default Message;