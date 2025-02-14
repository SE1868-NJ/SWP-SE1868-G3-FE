import React from 'react';

const ConversationItem = ({ conversation, isSelected, onClick, userId }) => {
  const otherParty = conversation.user_id === userId ? 
    conversation.shop_id : 
    conversation.user_id;

  return (
    <div
      className={`p-2 border-bottom ${isSelected ? 'bg-light' : ''}`}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-truncate">
          <strong>Shop {otherParty}</strong>
          <div className="small text-muted text-truncate">
            {conversation.last_message || 'No messages'}
          </div>
        </div>
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