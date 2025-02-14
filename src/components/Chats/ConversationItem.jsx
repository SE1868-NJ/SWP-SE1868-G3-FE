import React from 'react';

const ConversationItem = ({ conversation, isSelected, onClick, userId }) => {
  const otherParty = conversation.user_id === userId ? conversation.shop_id : conversation.user_id;

  return (
    <div
      className={`p-2 border-bottom ${isSelected ? 'bg-light' : ''}`}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {/* Avatar của shop */}
          <div className="me-2">
            <img
              src={conversation.shop.shop_logo || 'https://tiemquatiko.com/wp-content/uploads/2022/08/shopee-circle-logo-design-shopping-bag-13.png'}
              alt="Shop avatar"
              className="rounded-circle"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
          </div>
          {/* Tên shop */}
          <div className="text-truncate">
            <strong>{conversation.shop.shop_name}</strong>
          </div>
        </div>
        {/* Badge unread count */}
        {conversation.unread_count > 0 && (
          <span className="badge bg-danger rounded-pill">
            {conversation.unread_count}
          </span>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;