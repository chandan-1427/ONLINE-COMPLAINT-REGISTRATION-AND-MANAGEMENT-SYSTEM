import axios from 'axios';

const API_BASE = "http://localhost:8000";

export const agentApi = {
  // Fetches all complaints assigned to a specific agent
  getAssignedComplaints: (agentId) => 
    axios.get(`${API_BASE}/allcomplaints/${agentId}`),
};