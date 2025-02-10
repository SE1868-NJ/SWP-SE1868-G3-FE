// import AppRoutes from './routes';
import React from 'react';
import ChatDemo from './components/Chat/ChatDemo';
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
// import { useParams } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                {/* Định tuyến đến trang chat với conversationId và userId */}
                <Route path="/chat/:conversationId/:userId" element={<ChatWrapper />} />
            </Routes>
        </Router>
    );
}

const ChatWrapper = () => {
    const { conversationId, userId } = useParams();
    
    return <ChatDemo conversationId={parseInt(conversationId)} userId={parseInt(userId)} />;
};


export default App
