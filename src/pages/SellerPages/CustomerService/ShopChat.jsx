import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ShopChatList from '../../../components/Seller/CustomerService/Chat/ShopChatList';
import ShopChatWindow from '../../../components/Seller/CustomerService/Chat/ShopChatWindow';
import { chatService } from '../../../services/chatService';
import { Socket } from '../../../services/socket';
import { useSeller } from '../../../hooks/contexts/SellerContext';

const ShopChat = () => {
    const { shops } = useSeller(); 
    const shopId = shops[0]?.shop_id;

    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const [loadingConversations, setLoadingConversations] = useState(false);
    const [errorConversations, setErrorConversations] = useState(null);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [errorMessages, setErrorMessages] = useState(null);
    const [isSending, setIsSending] = useState(false); 
    const fileInputRef = useRef(null); 

    const fetchConversations = useCallback(async () => {
        if (!shops) return; 
        setLoadingConversations(true);
        setErrorConversations(null);
        try {
            const data = await chatService.getConversationsByShop(shopId);
            setConversations(data || []); 
        } catch (error) {
            console.error('Error fetching conversations:', error);
            setErrorConversations('Không thể tải danh sách cuộc trò chuyện. Vui lòng thử lại.');
        } finally {
            setLoadingConversations(false);
        }
    }, [shopId]); 

    useEffect(() => {
        fetchConversations();
    }, [fetchConversations]); 
    const fetchMessages = useCallback(async (conversationId) => {
        if (!conversationId) return;
        setLoadingMessages(true);
        setErrorMessages(null);
        setMessages([]); 
        try {
            const data = await chatService.getMessages(conversationId);
            setMessages(data?.messages || []); 
        } catch (error) {
            console.error('Error fetching messages:', error);
            setErrorMessages('Không thể tải tin nhắn. Vui lòng thử lại.');
        } finally {
            setLoadingMessages(false);
        }
    }, []); 

    useEffect(() => {
        if (!selectedConversationId || !Socket.connected) { 
            return; 
        }

        const handleNewMessage = (newMessage) => {
            if (newMessage?.conversation_id === selectedConversationId) {
                setMessages(prev => {
                    if (prev.some(msg => msg.message_id === newMessage.message_id)) { 
                        return prev;
                    }
                    return [...prev, newMessage];
                });
            }

            setConversations(prevConvs => prevConvs.map(conv => {
                if (conv.conversation_id === newMessage.conversation_id) {
                    return { ...conv, last_message: newMessage }; 
                }
                return conv;
            }));
        };

        Socket.emit('join-conversation', selectedConversationId);
        Socket.on('receive_message', handleNewMessage);
        console.log(`Joined conversation ${selectedConversationId}`);

        return () => {
            Socket.emit('leave-conversation', selectedConversationId);
            Socket.off('receive_message', handleNewMessage);
            console.log(`Left conversation ${selectedConversationId}`);
        };
    }, [selectedConversationId]);

    const handleSelectConversation = useCallback((conversationId) => {
        if (conversationId === selectedConversationId) return;
        setSelectedConversationId(conversationId);
        fetchMessages(conversationId);
    }, [selectedConversationId, fetchMessages]);

    const handleSendMessage = async () => {
        if (!message.trim() || !selectedConversationId || isSending || !Socket.connected) {
            if (!Socket.connected) console.warn("Socket not connected, cannot send message.");
            return;
        }

        setIsSending(true);
        const tempMessageId = `temp_${Date.now()}`;

        const messageData = {
            conversation_id: selectedConversationId,
            sender_id: shops[0].shop_id,
            sender_type: 'shop',
            message_text: message.trim(),
            message_type: 'text',
            media_url: '',
            _tempId: tempMessageId
        };

        const optimisticMessage = {
            ...messageData,
            message_id: tempMessageId,
            created_at: new Date().toISOString(),
            status: 'sending'
        };
        setMessages(prev => [...prev, optimisticMessage]);
        setMessage('');

        try {
            Socket.emit('send-message', messageData, (ack) => {
                if (ack?.status === 'ok' && ack?.newMessage) {
                    setMessages(prev => prev.map(msg =>
                        msg.message_id === tempMessageId ? { ...ack.newMessage, status: 'sent' } : msg
                    ));
                } else if (ack?.status === 'error') {
                    console.error("Server ACK Error:", ack.message);
                    setMessages(prev => prev.map(msg =>
                        msg.message_id === tempMessageId ? { ...msg, status: 'failed' } : msg
                    ));
                }
            });

        } catch (error) {
            console.error('Error sending message via socket:', error);
            setMessages(prev => prev.map(msg =>
                msg.message_id === tempMessageId ? { ...msg, status: 'failed' } : msg
            ));
        } finally {
            setIsSending(false);
        }
    };


    const handleFileSelect = async (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile || !selectedConversationId || isSending || !Socket.connected) {
            if (!Socket.connected) console.warn("Socket not connected, cannot send file.");
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        if (selectedFile.size > maxSize) {
            alert('Kích thước file quá lớn (tối đa 5MB).');
            return;
        }
        // if (!allowedTypes.includes(selectedFile.type)) {
        //     alert('Định dạng file không được hỗ trợ.');
        //     return;
        // }

        setIsSending(true);
        const tempMessageId = `temp_${Date.now()}_file`;

        const optimisticMessage = {
            conversation_id: selectedConversationId,
            sender_id: shops[0].shop_id,
            sender_type: 'shop',
            message_text: selectedFile.name,
            message_type: selectedFile.type.startsWith('image/') ? 'image' : 'file',
            media_url: URL.createObjectURL(selectedFile),
            message_id: tempMessageId,
            created_at: new Date().toISOString(),
            status: 'uploading'
        };
        setMessages(prev => [...prev, optimisticMessage]);


        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('prefix_name', "Shop");

            const uploadResponse = await chatService.uploadFile(formData);

            if (!uploadResponse?.url) {
                throw new Error("Upload failed or URL not returned.");
            }

            const messageData = {
                conversation_id: selectedConversationId,
                sender_id: shopId,
                sender_type: 'shop',
                message_text: '',
                message_type: selectedFile.type.startsWith('image/') ? 'image' : 'file',
                media_url: uploadResponse.url,
                _tempId: tempMessageId
            };

            Socket.emit('send-message', messageData, (ack) => {
                if (ack?.status === 'ok' && ack?.newMessage) {
                    setMessages(prev => prev.map(msg =>
                        msg.message_id === tempMessageId ? { ...ack.newMessage, status: 'sent' } : msg
                    ));
                    if (optimisticMessage.media_url.startsWith('blob:')) {
                        URL.revokeObjectURL(optimisticMessage.media_url);
                    }
                } else if (ack?.status === 'error') {
                    console.error("Server ACK Error for file:", ack.message);
                    setMessages(prev => prev.map(msg =>
                        msg.message_id === tempMessageId ? { ...msg, status: 'failed' } : msg
                    ));
                }
            });

        } catch (error) {
            console.error('Error uploading or sending file:', error);
            setMessages(prev => prev.map(msg =>
                msg.message_id === tempMessageId ? { ...msg, status: 'failed' } : msg
            ));
        } finally {
            setIsSending(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <Row className="g-3 h-100">
            <Col xs={12} md={4} lg={3} className="d-flex flex-column h-100">
                {errorConversations && <Alert variant="danger">{errorConversations}</Alert>}
                <ShopChatList
                    conversations={conversations}
                    selectedConversationId={selectedConversationId}
                    onSelectConversation={handleSelectConversation}
                    loading={loadingConversations}
                />
            </Col>

            <Col xs={12} md={8} lg={9} className="d-flex flex-column h-100">
                <ShopChatWindow
                    selectedConversationId={selectedConversationId}
                    messages={messages}
                    shopId={shopId}
                    message={message}
                    setMessage={setMessage}
                    onSendMessage={handleSendMessage}
                    onFileSelectTrigger={() => fileInputRef.current?.click()}
                    isSending={isSending}
                    loadingMessages={loadingMessages}
                    errorMessages={errorMessages}
                    conversations={conversations}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                // accept="image/*,application/pdf" // Giới hạn loại file nếu cần
                />
            </Col>
        </Row>
    );
};

export default ShopChat;