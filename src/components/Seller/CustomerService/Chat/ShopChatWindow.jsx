import React, { useRef, useEffect, useMemo } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import Message from './Message'; 
import MessageInput from './MessageInput'; 

const ShopChatWindow = React.memo(({
    selectedConversationId,
    messages,
    shopId,
    message,
    setMessage,
    onSendMessage,
    onFileSelectTrigger, 
    isSending, 
    loadingMessages, 
    errorMessages, 
    conversations,
}) => {
    const messagesContainerRef = useRef(null); 
    const isScrolledToBottom = useRef(true); 

    const selectedUserDetails = useMemo(() => {
        if (!selectedConversationId) return null;
        return conversations.find(c => c.conversation_id === selectedConversationId)?.user;
    }, [selectedConversationId, conversations]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container && isScrolledToBottom.current) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (container) {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const threshold = 50;
            isScrolledToBottom.current = scrollHeight - clientHeight <= scrollTop + threshold;
        }
    };

    return (
        <Card className="h-100 d-flex flex-column"> 
            <Card.Header className="flex-shrink-0">
                <h5 className="mb-0 text-truncate"> 
                    {selectedUserDetails
                        ? `Trò chuyện với ${selectedUserDetails.full_name || 'User'}` 
                        : selectedConversationId ? 'Đang tải...' : 'Chọn cuộc trò chuyện'
                    }
                </h5>
            </Card.Header>

            <div className="flex-grow-1 overflow-hidden d-flex flex-column"> 
                {selectedConversationId ? (
                    <>
                        <div
                            className="flex-grow-1 overflow-auto p-3" 
                            ref={messagesContainerRef}
                            onScroll={handleScroll}
                        >
                            {loadingMessages && (
                                <div className="text-center my-3">
                                    <Spinner animation="border" size="sm" variant="primary" />
                                    <span className='ms-2'>Đang tải tin nhắn...</span>
                                </div>
                            )}
                            {errorMessages && (
                                <Alert variant="warning" className="text-center small p-2">
                                    {errorMessages}
                                </Alert>
                            )}
                            {!loadingMessages && messages.map((msg) => (
                                <Message 
                                    key={msg.message_id || msg._tempId} 
                                    message={msg}
                                    isOwnMessage={msg.sender_id === shopId && msg.sender_type === 'shop'}
                                />
                            ))}
                        </div>

                        <div className="flex-shrink-0 border-top">
                            <MessageInput 
                                message={message}
                                setMessage={setMessage}
                                onSend={onSendMessage}
                                onFileSelectTrigger={onFileSelectTrigger}
                                isSending={isSending} 
                            />
                        </div>
                    </>
                ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 text-center p-4">
                        <div>
                            <i className="bi bi-chat-dots display-4 text-muted mb-3"></i>
                            <p className="text-muted">Chọn một cuộc trò chuyện để bắt đầu nhắn tin.</p>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
});

export default ShopChatWindow;