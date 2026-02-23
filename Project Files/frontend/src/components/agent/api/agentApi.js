import axios from 'axios';

const API_BASE = "http://localhost:8000/api/agent";

export const agentApi = {
  // Fetch all complaints assigned to agent
  getAssignedComplaints: (agentId) =>
    axios.get(`${API_BASE}/${agentId}/complaints`),
};
