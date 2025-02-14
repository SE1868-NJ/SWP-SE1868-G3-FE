import ChatDemo from "./ChatDemo";
import ConversationsList from "./ConversationList";
import { useState } from "react";
import axios from "axios";

const ChatApp = ({ userId }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSelectConversation = async (conversationId) => {
    setSelectedConversation(conversationId);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/message/getMessage/${conversationId}?limit=20&offset=0`
      );
      setMessages(response.data.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row flex-grow-1">
        <ConversationsList
          userId={userId}
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
        />
        <div className="col-md-9 d-flex flex-column p-3">
          {selectedConversation ? (
            <ChatDemo
              conversationId={selectedConversation}
              userId={userId}
              messages={messages}
              setMessages={setMessages}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100">
              <p className="text-muted">Select a conversation to start</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
