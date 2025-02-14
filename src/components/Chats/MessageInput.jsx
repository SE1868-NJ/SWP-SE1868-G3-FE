import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';

const MessageInput = ({ 
  message, 
  setMessage, 
  onSend,
  onFileSelect,
  fileInputRef 
}) => {
  return (
    <div className="p-2 border-top">
      <InputGroup>
        <Button 
          variant="outline-secondary"
          onClick={() => fileInputRef.current?.click()}
        >
          <FaPaperclip />
        </Button>
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="Type a message..."
        />
        <Button 
          variant="danger"
          onClick={onSend}
        >
          <FaPaperPlane />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileSelect}
          className="d-none"
          accept="image/*"
        />
      </InputGroup>
    </div>
  );
};

export default MessageInput;