import React, { useState } from 'react';
import { Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { FaPaperPlane, FaPaperclip, FaSmile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

const MessageInput = ({ 
  message, 
  setMessage, 
  onSend,
  onFileSelect,
  fileInputRef 
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    // Thêm emoji vào vị trí con trỏ hiện tại hoặc cuối chuỗi
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-2 border-top position-relative">
      <InputGroup>
        <Button 
          variant="outline-secondary"
          onClick={() => fileInputRef.current?.click()}
        >
          <FaPaperclip />
        </Button>

        {/* Emoji Button */}
        <Button
          variant="outline-secondary"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FaSmile />
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

        {/* Emoji Picker Popup */}
        {showEmojiPicker && (
          <div 
            className="position-absolute bottom-100 start-0"
            style={{ zIndex: 1000 }}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              searchDisabled
              skinTonesDisabled
              width={300}
              height={400}
            />
          </div>
        )}
      </InputGroup>
    </div>
  );
};

export default MessageInput;