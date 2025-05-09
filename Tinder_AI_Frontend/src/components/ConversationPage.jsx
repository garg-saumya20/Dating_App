import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './ConversationPage.css';

export default function ConversationPage() {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const chatBoxRef = useRef(null);

  // Fetch profile details on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/profiles/${profileId}`);

        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(errorMsg);
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [profileId]);

  // Fetch chat history once the profile is loaded
  useEffect(() => {
    if (!profile) return; // Don't fetch chat history if the profile is not available yet

    const fetchChatHistory = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/chat/${profileId}`);

        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(errorMsg);
        }

        const data = await res.json();
        setChatMessages(data.messages);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchChatHistory();
  }, [profile, profileId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    try {
      const response = await fetch(`http://localhost:8080/api/chat/${profileId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const newMessage = await response.json();
      setChatMessages((prev) => [...prev, newMessage]);
      setUserInput('');
    } catch (err) {
      console.error(err);
      alert('Error sending message.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(); // Format to HH:MM AM/PM
  };

  return (
    <div className="chat-container">
      {error && <p className="error-text">{error}</p>}

      {profile ? (
        <>
          <h2 className="chat-title">Chat with {profile.firstName} {profile.lastName}</h2>
          <div className="profile-header">
            <img
              src={`http://localhost:8080${profile.imageUrl}`}
              alt="Profile"
              className="profile-img"
            />
            <p className="profile-bio">{profile.bio}</p>
          </div>
        </>
      ) : (
        <p>Loading profile...</p>
      )}

      <div className="chat-box" ref={chatBoxRef}>
        {
          chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.sender === 'USER' ? 'user' : 'ai'}`}
            >
              <div className="message-content">
                <strong>{msg.sender === 'USER' ? 'You' : `${profile.firstName} ${profile.lastName}`}:</strong>
                <p>{msg.message}</p>
                <small style={{ color: '#000' }}>{formatDate(msg.sentAt)}</small>
              </div>
            </div>
          ))
        }
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSend} className="send-btn">Send</button>
      </div>
    </div>
  );
}
