// import AppRoutes from './routes';
import React from 'react';
import ChatDemo from './components/Chat/ChatDemo';
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import ChatApp from './components/Chat/ChatApp';
// import { useParams } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/chat/:userId" element={<ChatWrapper />} />
            </Routes>
        </Router>
    );
}

const ChatWrapper = () => {
    const { userId } = useParams();
    return <ChatApp userId={parseInt(userId)} />;
};


export default App
