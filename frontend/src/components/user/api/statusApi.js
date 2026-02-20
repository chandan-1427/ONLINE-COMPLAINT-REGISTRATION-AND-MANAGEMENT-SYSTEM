import axios from 'axios';

const API_BASE = "http://localhost:8000";

export const statusApi = {
  getUserComplaints: (userId) => axios.get(`${API_BASE}/status/${userId}`),
};