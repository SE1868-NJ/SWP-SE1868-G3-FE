import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

const ChatDemo = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    // Config mẫu cho demo
    const DEMO_CONFIG = {
        conversationId: "1",
        userId: 14,
        shopId: 1
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/message/getMessage/1?limit=20&offset=0`);
                setMessages(response.data.data.messages);
                scrollToBottom();
            } catch (error) {
                console.error("Lỗi khi lấy tin nhắn:", error);
            }
        };
        // console.log("Messages", messages);

        fetchMessages();
        console.log("Messages", messages);

        // Join conversation room khi component mount
        socket.emit("join-conversation", DEMO_CONFIG.conversationId);

        // Lắng nghe tin nhắn mới
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
            scrollToBottom();
        });

        // Cleanup khi component unmount
        return () => {
            socket.emit("leave-conversation", DEMO_CONFIG.conversationId);
            socket.off("receive_message");
        };
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return;

        const messageData = {
            conversation_id: DEMO_CONFIG.conversationId,
            sender_id: DEMO_CONFIG.userId,
            sender_type: "user",
            message_text: message
        };

        socket.emit("send-message", messageData);
        setMessages((prev) => [...prev, messageData]); // Cập nhật tin nhắn ngay lập tức
        setMessage("");
        scrollToBottom();
    };

    return (
        <div className="container mt-5">
            <div className="card">
                {/* Header */}
                <div className="card-header bg-primary text-white text-center">
                    <h5 className="mb-0">Chat Demo</h5>
                </div>

                {/* Messages area */}
                <div className="card-body overflow-auto" style={{ height: "400px" }}>
                    <ul className="list-group">
                        {messages.map((msg, index) => (
                            <li
                                key={index}
                                className={`list-group-item border-0 d-flex ${
                                    msg.sender_id === DEMO_CONFIG.userId ? "justify-content-end" : ""
                                }`}
                            >
                                <span
                                    className={`badge p-2 ${
                                        msg.sender_id === DEMO_CONFIG.userId
                                            ? "bg-primary text-white"
                                            : "bg-secondary text-white"
                                    }`}
                                >
                                    {msg.message_text}
                                </span>
                            </li>
                        ))}
                        <div ref={messagesEndRef} />
                    </ul>
                </div>

                {/* Input area */}
                <div className="card-footer">
                    <div className="input-group">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Nhập tin nhắn..."
                            className="form-control"
                        />
                        <button onClick={sendMessage} className="btn btn-primary">
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatDemo;