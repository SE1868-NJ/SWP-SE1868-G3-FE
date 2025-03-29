import React from 'react';

const ShopConversationItem = ({ conversation, isSelected, onClick }) => {
    return (
        <div
            className={`p-3 border-bottom ${isSelected ? 'bg-light' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={onClick}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h6 className="mb-1">User #{conversation.user.full_name}</h6>
                    <p className="text-muted small mb-0">
                        {conversation.last_message || 'No messages yet'}
                    </p>
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

export default ShopConversationItem;