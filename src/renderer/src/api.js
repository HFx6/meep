import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const sendMessage = async (conversationId, message) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { 
      conversation_id: conversationId,
      message 
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getConversations = async () => {
  try {
    const response = await axios.get(`${API_URL}/conversations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const getConversation = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/conversations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error;
  }
};

export const createConversation = async (title) => {
  try {
    const response = await axios.post(`${API_URL}/conversations`, { title });
    return response.data;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

export const deleteConversation = async (id) => {
  try {
    await axios.delete(`${API_URL}/conversations/${id}`);
  } catch (error) {
    console.error('Error deleting conversation:', error);
    throw error;
  }
};