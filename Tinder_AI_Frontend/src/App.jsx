// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import SwipeRightPage from './components/SwipeRightPage';
import ConversationPage from './components/ConversationPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/api/match/all-matches" element={<SwipeRightPage />} />
        <Route path="/api/chat/:profileId" element={<ConversationPage />} />
      </Routes>
    </Router>
  );
}
