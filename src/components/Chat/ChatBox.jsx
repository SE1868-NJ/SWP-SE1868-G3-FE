import React from 'react';
import { Card } from 'react-bootstrap';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatBox = ({ conversation, messages, userId, onSendMessage }) => {
  if (!conversation) {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <p className="text-muted">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <Card className="h-100 border-0">
      <ChatHeader conversation={conversation} />
      <div className="flex-grow-1 overflow-auto">
        <ChatMessages messages={messages} userId={userId} />
      </div>
      <ChatInput onSendMessage={onSendMessage} />
    </Card>
  );
};

export default ChatBox;