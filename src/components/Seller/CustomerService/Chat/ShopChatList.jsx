import React from 'react';
import { Card } from 'react-bootstrap';
import ShopConversationItem from './ShopConversationItem';

const ShopChatList = ({
    conversations,
    selectedConversation,
    onSelectConversation,
}) => {
    return (
        <Card className="h-100">
            <Card.Header>
                <h5 className="mb-0">Chat</h5>
            </Card.Header>
            <Card.Body className="p-0">
                <div className="conversations-list overflow-auto h-100">
                    {conversations.map((conv) => (
                        <ShopConversationItem
                            key={conv.conversation_id}
                            conversation={conv}
                            isSelected={selectedConversation === conv.conversation_id}
                            onClick={() => onSelectConversation(conv.conversation_id)}
                        />
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
};

export default ShopChatList;