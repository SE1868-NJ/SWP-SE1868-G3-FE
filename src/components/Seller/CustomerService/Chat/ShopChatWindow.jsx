import React, { useRef, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Message from './Message';
import MessageInput from './MessageInput';

const ShopChatWindow = ({
    selectedConversation,
    messages,
    shopId,
    message,
    setMessage,
    onSendMessage,
    onFileSelect,
    conversations,
    fileInputRef
}) => {
    const chatContainerRef = useRef(null);
    const messagesEndRef = useRef(null);
    const isAutoScrolling = useRef(true);
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll khi có tin nhắn mới hoặc chọn conversation mới
    useEffect(() => {
        if (isAutoScrolling.current) {
            scrollToBottom();
        }
    }, [messages]);

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
            isAutoScrolling.current = isAtBottom;
        }
    };

    return (
        <Card className="h-100">
            <Card.Header>
                <h5 className="mb-0">
                    {selectedConversation
                        ? `Chat with User #${conversations.find(c => c.conversation_id === selectedConversation)?.user.full_name}`
                        : 'Select a conversation'
                    }
                </h5>
            </Card.Header>
            <Card.Body className="p-0 d-flex flex-column" style={{ height: '600px' }}>
                {selectedConversation ? (
                    <>
                        <div
                            className="flex-grow-1 overflow-auto p-3"
                            ref={chatContainerRef}
                            onScroll={handleScroll}
                        >
                            {messages.map((msg, index) => (
                                <Message
                                    key={index}
                                    message={msg}
                                    isOwnMessage={msg.sender_id === shopId}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <MessageInput
                            message={message}
                            setMessage={setMessage}
                            onSend={onSendMessage}
                            onFileSelect={onFileSelect}
                            fileInputRef={fileInputRef}
                        />
                    </>
                ) : (
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <p className="text-muted">Select a conversation to start chatting</p>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}
export default ShopChatWindow;