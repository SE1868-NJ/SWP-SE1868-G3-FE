import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import { IoMdChatboxes } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import io from 'socket.io-client';
import ConversationItem from './ConversationItem';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

const socket = io("http://localhost:3001");

const ChatPopup = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const isAutoScrolling = useRef(true);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/conversation/user/${userId}`
        );
        if (response.data?.data) {
          setConversations(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    if (userId) {
      fetchConversations();
    }
  }, [userId]);

  // Handle socket connections
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/message/getMessage/${selectedConversation}?limit=20&offset=0`
          );
          setMessages(response.data.data.messages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
      socket.emit('join-conversation', selectedConversation);

      socket.on('receive_message', (newMessage) => {
        setMessages(prev => [...prev, newMessage]);
      });

      return () => {
        socket.emit('leave-conversation', selectedConversation);
        socket.off('receive_message');
      };
    }
  }, [selectedConversation]);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current && isAutoScrolling.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
      isAutoScrolling.current = isAtBottom;
    }
  };

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('shopName', 'shop1');

      try {
        const response = await axios.post(
          'http://localhost:4000/api/file/upload',
          formData
        );
        
        const messageData = {
          conversation_id: selectedConversation,
          sender_id: userId,
          sender_type: 'user',
          message_text: '',
          message_type: 'file',
          media_url: response.data.data.url,
        };

        socket.emit('send-message', messageData);
        setFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
        setFile(null);
      }
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return;

    const messageData = {
      conversation_id: selectedConversation,
      sender_id: userId,
      sender_type: 'user',
      message_text: message.trim(),
      message_type: 'text',
      media_url: '',
    };

    socket.emit('send-message', messageData);
    setMessage('');
  };

  return (
    <div className="position-fixed bottom-0 end-0 mb-3 me-3" style={{ zIndex: 1050 }}>
      {!isOpen ? (
        <Button 
          variant="danger" 
          className="rounded-circle p-3"
          onClick={() => setIsOpen(true)}
        >
          <IoMdChatboxes size={24} />
        </Button>
      ) : (
        <Card style={{ minWidth: '642px', minHeight: '582px' }}>
          <Card.Header className="bg-danger text-white d-flex justify-content-between align-items-center">
            <span>Messages</span>
            <Button 
              variant="link" 
              className="text-white p-0"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </Button>
          </Card.Header>

          <Card.Body className="p-0 d-flex">
            {/* Conversations List */}
            <div className="border-end" style={{ width: '130px', overflowY: 'auto' }}>
              {conversations.map(conv => (
                <ConversationItem
                  key={conv.id || conv.conversation_id}
                  conversation={conv}
                  isSelected={selectedConversation === (conv.id || conv.conversation_id)}
                  onClick={() => setSelectedConversation(conv.id || conv.conversation_id)}
                  userId={userId}
                />
              ))}
            </div>

            {/* Chat Area */}
            <div className="flex-grow-1 d-flex flex-column">
              {selectedConversation ? (
                <>
                  <ChatWindow
                    messages={messages}
                    userId={userId}
                    chatRef={chatContainerRef}
                    onScroll={handleScroll}
                  />
                  <MessageInput
                    message={message}
                    setMessage={setMessage}
                    onSend={handleSendMessage}
                    onFileSelect={handleFileSelect}
                    fileInputRef={fileInputRef}
                  />
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100">
                  <p className="text-muted">Select a conversation</p>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ChatPopup;