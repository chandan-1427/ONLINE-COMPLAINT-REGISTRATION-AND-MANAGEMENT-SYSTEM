import axios from 'axios';

const API_BASE = "http://localhost:8000";

export const userApi = {
  submitComplaint: (userId, data) => 
    axios.post(`${API_BASE}/Complaint/${userId}`, {
      ...data,
      status: 'pending' // Force consistent data format
    }),
};