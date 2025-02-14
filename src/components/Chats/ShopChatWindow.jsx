import React from 'react';
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
    chatContainerRef,
    conversations, 
    fileInputRef
}) => {
    return (
        <Card className="h-100">
            <Card.Header>
                <h5 className="mb-0">
                    {selectedConversation
                        ? `Chat with User #${conversations.find(c => c.conversation_id === selectedConversation)?.user_id}`
                        : 'Select a conversation'
                    }
                </h5>
            </Card.Header>
            <Card.Body className="p-0 d-flex flex-column" style={{ height: '600px' }}>
                {selectedConversation ? (
                    <>
                        <div
                            className="flex-grow-1 overflow-auto"
                            ref={chatContainerRef}
                        >
                            {messages.map((msg, index) => (
                                <Message
                                    key={index}
                                    message={msg}
                                    isOwnMessage={msg.sender_id === shopId}
                                />
                            ))}
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
};

export default ShopChatWindow;