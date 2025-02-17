import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import { IoMdChatboxes } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import UserConversationItem from './UserConversationItem';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import { chatService } from '../../services/chatService';
import { Socket } from '../../services/socket';

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

  const name = "user_name1"

  const setupSocketHandlers = (conversationId) => {
    // Remove all existing listeners first
    Socket.removeAllListeners();

    // Join new conversation
    Socket.emit('join-conversation', conversationId);

    // Setup new listeners
    Socket.on('receive_message', (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    Socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  };

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await chatService.getConversations(userId);
        setConversations(data);
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
          const data = await chatService.getMessages(selectedConversation);
          setMessages(data.messages);
          setupSocketHandlers(selectedConversation);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
      // Socket.emit('join-conversation', selectedConversation);

      // Socket.on('receive_message', (newMessage) => {
      //   setMessages(prev => [...prev, newMessage]);
      // });

      return () => {
        Socket.removeAllListeners();
        Socket.emit('leave-conversation', selectedConversation);
        setMessages([]);
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
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('prefix_name', name);

      const { url } = await chatService.uploadFile(formData);

      Socket.emit('send-message', {
        conversation_id: selectedConversation,
        sender_id: userId,
        sender_type: 'user',
        message_text: '',
        message_type: 'file',
        media_url: url,
      });
    } catch (error) {
      console.error('❌ Error uploading file:', error);
    } finally {
      setFile(null);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return;

    Socket.emit('send-message', {
      conversation_id: selectedConversation,
      sender_id: userId,
      sender_type: 'user',
      message_text: message.trim(),
      message_type: 'text',
      media_url: '',
    });

    setMessage('');
  };

  const handleClose = () => {
    setIsOpen(false);
    Socket.removeAllListeners();
    if (selectedConversation) {
      Socket.emit('leave-conversation', selectedConversation);
    }
    setSelectedConversation(null);
    setMessages([]);
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
              onClick={handleClose}
            >
              <FaTimes />
            </Button>
          </Card.Header>

          <Card.Body className="p-0 d-flex">
            {/* Conversations List */}
            <div className="border-end" style={{ minWidth: '130px', overflowY: 'auto', maxWidth: '200px' }}>
              {conversations.map(conv => (
                <UserConversationItem
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