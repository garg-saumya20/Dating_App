// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const swipeRight = (profileId) => {
  return axios.post(`${API_BASE_URL}/match/swipe-right/${profileId}`);
};

export const sendMessage = (profileId, message) => {
  return axios.post(`${API_BASE_URL}/chat/${profileId}`, { message });
};

export const getChatHistory = (profileId) => {
  return axios.get(`${API_BASE_URL}/chat/${profileId}`);
};
