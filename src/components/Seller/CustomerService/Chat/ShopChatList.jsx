import React from 'react';
import { Card, Spinner, ListGroup } from 'react-bootstrap';
import ShopConversationItem from './ShopConversationItem'; 

const ShopChatList = React.memo(({
    conversations,
    selectedConversationId,
    onSelectConversation,
    loading 
}) => {
    return (
        <Card className="h-100 d-flex flex-column">
            <Card.Header className="flex-shrink-0"> 
                <h5 className="mb-0">Cuộc trò chuyện</h5>
            </Card.Header>
            <Card.Body className="p-0 flex-grow-1 overflow-hidden"> 
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <p className="text-muted mb-0">Không có cuộc trò chuyện nào.</p>
                    </div>
                ) : (
                    <ListGroup variant="flush" className="h-100 overflow-auto">
                        {conversations.map((conv) => (
                            <ShopConversationItem 
                                key={conv.conversation_id}
                                conversation={conv}
                                isSelected={selectedConversationId === conv.conversation_id}
                                onClick={() => onSelectConversation(conv.conversation_id)}
                            />
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
});

export default ShopChatList;