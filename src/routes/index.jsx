// src/routes/index.jsx
import React from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
// import ChatPage from '../pages/ChatPage';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            {/* <Route path="/login" element={<LoginPage />} /> */}

            {/* Protected Routes với Layout */}
            {/* <Route path="/" element={<MainLayout />}> */}
                {/* <Route path="chat" element={<ChatPage />} />
                <Route path="chat/:conversationId" element={<ChatPage />} /> */}
            {/* </Route> */}
        </Routes>
    );
};

export default AppRoutes;