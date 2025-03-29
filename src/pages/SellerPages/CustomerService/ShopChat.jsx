import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ShopChatList from '../../../components/Seller/CustomerService/Chat/ShopChatList';
import ShopChatWindow from '../../../components/Seller/CustomerService/Chat/ShopChatWindow';
import { chatService } from '../../../services/chatService';
import { Socket } from '../../../services/socket';

const ShopChat = () => {
    const shopId = 1; // From authentication
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    // Socket and data fetching effects
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const data = await chatService.getConversationsByShop(shopId);
                setConversations(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        if (shopId) {
            fetchConversations();
        }
    }, [shopId]);

    useEffect(() => {
        if (selectedConversation) {
            const fetchMessages = async () => {
                try {
                    const data = await chatService.getMessages(selectedConversation);
                    setMessages(data.messages);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchMessages();
            Socket.emit('join-conversation', selectedConversation);
            Socket.on('receive_message', handleNewMessage);

            return () => {
                Socket.emit('leave-conversation', selectedConversation);
                Socket.off('receive_message');
            };
        }
    }, [selectedConversation]);

    // Handlers
    const handleNewMessage = (newMessage) => {
        setMessages(prev => [...prev, newMessage]);
    };


    const handleSendMessage = async () => {
        if (!message.trim() || !selectedConversation) return;

        const messageData = {
            conversation_id: selectedConversation,
            sender_id: shopId,
            sender_type: 'shop',
            message_text: message.trim(),
            message_type: 'text',
            media_url: '',
        };

        Socket.emit('send-message', messageData);
        setMessage('');
    };

    const handleFileSelect = async (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedConversation) return;

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('prefix_name', "Shop");
            const fileUrl = await chatService.uploadFile(formData);

            Socket.emit('send-message', {
                conversation_id: selectedConversation,
                sender_id: shopId,
                sender_type: 'shop',
                message_text: '',
                message_type: 'file',
                media_url: fileUrl.url,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container fluid className="py-4">
            <Row className="h-100" style={{ minHeight: 'calc(100vh - 100px)' }}>
                <Col md={3} className="mb-3">
                    <ShopChatList
                        conversations={conversations}
                        selectedConversation={selectedConversation}
                        onSelectConversation={setSelectedConversation}
                    />
                </Col>
                <Col md={9} className="mb-3">
                    <ShopChatWindow
                        selectedConversation={selectedConversation}
                        messages={messages}
                        shopId={shopId}
                        message={message}
                        setMessage={setMessage}
                        onSendMessage={handleSendMessage}
                        onFileSelect={handleFileSelect}
                        chatContainerRef={chatContainerRef}
                        conversations={conversations}
                        fileInputRef={fileInputRef}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ShopChat;