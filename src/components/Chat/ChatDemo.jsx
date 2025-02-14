import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { FaImage, FaTimes } from "react-icons/fa";

const socket = io("http://localhost:3001");

const ChatDemo = ({ conversationId, userId, messages, setMessages }) => {
    const chatContainerRef = useRef(null);
    const isAutoScrolling = useRef(true);
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.emit("join-conversation", conversationId);
        socket.on("receive_message", (data) => {
            setMessages(prev => [...prev, data]);
        });

        return () => {
            socket.emit("leave-conversation", conversationId);
            socket.off("receive_message");
        };
    }, [conversationId]);

    useEffect(() => {
        const scrollToBottom = () => {
            if (chatContainerRef.current && isAutoScrolling.current) {
                const { scrollHeight, clientHeight } = chatContainerRef.current;
                chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
            }
        };

        scrollToBottom();
    }, [messages]);

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
            isAutoScrolling.current = isAtBottom;
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setMessage(prev => prev + emojiObject.emoji);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile));
        }
    };

    const removeFile = () => {
        setFile(null);
        setFilePreview(null);
    };

    const sendMessage = async () => {
        if (!message.trim() && !file) return;

        let fileUrl = null;

        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("shopName", "shop1");
            try {
                const response = await axios.post("http://localhost:4000/api/file/upload", formData);
                fileUrl = response.data.data.url;
            } catch (error) {
                console.error("Error uploading file:", error);
                return;
            }
        }

        const messageData = {
            conversation_id: conversationId,
            sender_id: userId,
            sender_type: "user",
            message_text: message.trim(),
            message_type: file ? "file" : "text",
            media_url: fileUrl || "",
        };

        socket.emit("send-message", messageData);
        setMessage("");
        setFile(null);
        setFilePreview(null);
    };

    return (
        <div className="card h-100">
            <div className="card-header bg-primary text-white text-center">
                <h5 className="mb-0">Chat</h5>
            </div>

            <div 
                className="card-body overflow-auto" 
                style={{ height: "calc(100vh - 250px)" }}
                ref={chatContainerRef}
                onScroll={handleScroll}
            >
                <div className="d-flex flex-column">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`d-flex mb-2 ${
                                msg.sender_id === userId ? "justify-content-end" : "justify-content-start"
                            }`}
                        >
                            <div
                                className={`p-2 ${
                                    msg.sender_id === userId 
                                        ? "bg-primary text-white rounded-start-4" 
                                        : "bg-secondary text-white rounded-end-4"
                                }`}
                                style={{ 
                                    maxWidth: "70%",
                                    borderRadius: msg.sender_id === userId ? "15px 15px 5px 15px" : "15px 15px 15px 5px",
                                    wordBreak: "break-word"
                                }}
                            >
                                {msg.message_type === "file" ? (
                                    <div className="message-image-container">
                                        <img 
                                            src={msg.media_url} 
                                            alt="Attachment" 
                                            className="img-fluid rounded"
                                            style={{ 
                                                maxWidth: "100%",
                                                maxHeight: "300px",
                                                objectFit: "contain"
                                            }} 
                                            onLoad={() => {
                                                if (isAutoScrolling.current) {
                                                    const { scrollHeight, clientHeight } = chatContainerRef.current;
                                                    chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
                                                }
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <p className="mb-0">{msg.message_text}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card-footer">
                {filePreview && (
                    <div className="mb-2 text-center position-relative">
                        <img 
                            src={filePreview} 
                            alt="Preview" 
                            style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "cover", borderRadius: "5px" }} 
                        />
                        <button 
                            className="btn btn-sm btn-danger position-absolute" 
                            style={{ top: 0, right: 0 }} 
                            onClick={removeFile}
                        >
                            <FaTimes />
                        </button>
                    </div>
                )}
                <div className="input-group">
                    <button 
                        className="btn btn-outline-secondary" 
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        😊
                    </button>
                    {showEmojiPicker && (
                        <div className="position-absolute" style={{ bottom: "50px", left: "10px" }}>
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type a message..."
                        className="form-control"
                    />

                    <button 
                        className="btn btn-outline-secondary" 
                        onClick={() => fileInputRef.current.click()}
                    >
                        <FaImage />
                    </button>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="d-none"
                    />

                    <button onClick={sendMessage} className="btn btn-primary">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ChatDemo;
