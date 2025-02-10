import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage('');
  };

  return (
    <Form onSubmit={handleSubmit} className="border-top p-3">
      <InputGroup>
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <Button type="submit" variant="primary">
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};
export default ChatInput;