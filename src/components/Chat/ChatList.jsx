import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ChatList = ({ conversations, currentConversation, onSelectConversation }) => {
  return (
    <div className="chat-list h-100 border-end">
      <div className="p-3 border-bottom">
        <h4 className="mb-0">Conversations</h4>
      </div>
      <ListGroup variant="flush">
        {conversations.map((conv) => (
          <ListGroup.Item
            key={conv.id}
            action
            active={currentConversation?.id === conv.id}
            onClick={() => onSelectConversation(conv)}
            className="d-flex align-items-center p-3"
          >
            <img
              src={conv.shop.avatar || 'https://via.placeholder.com/40'}
              alt={conv.shop.name}
              className="rounded-circle me-3"
              width="40"
              height="40"
            />
            <div className="flex-grow-1">
              <h6 className="mb-1">{conv.shop.name}</h6>
              <p className="mb-0 text-muted small">
                {conv.lastMessage?.content || 'Start chatting'}
              </p>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ChatList;