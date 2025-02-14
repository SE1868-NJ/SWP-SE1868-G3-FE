import { useEffect, useState } from "react";
import axios from "axios";

const ConversationsList = ({ userId, onSelectConversation, selectedConversation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
      const fetchConversations = async () => {
          try {
              const response = await axios.get(`http://localhost:4000/api/conversation/user/${userId}`);
              if (response.data && Array.isArray(response.data.data)) {
                  setConversations(response.data.data);
              }
          } catch (error) {
              console.error("Error fetching conversations:", error);
          }
      };
      fetchConversations();
  }, [userId]);

  return (
      <div className="col-md-3 border-end p-3 bg-light">
          <h5 className="text-center">Conversations</h5>
          <ul className="list-group">
              {conversations.map((conv) => {
                  const otherUser = conv.user_id === userId ? conv.shop_id : conv.user_id;
                  const conversationId = conv.conversation_id || conv.id;

                  return (
                      <li
                          key={conversationId}
                          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                              selectedConversation === conversationId ? "active" : ""
                          }`}
                          onClick={() => onSelectConversation(conversationId)}
                          style={{ cursor: "pointer" }}
                      >
                          <div>
                              <strong>{otherUser || "Unknown User"}</strong>
                              <p className="mb-0 text-muted small">{conv.last_message || "No recent messages"}</p>
                          </div>
                      </li>
                  );
              })}
          </ul>
      </div>
  );
};

export default ConversationsList;
