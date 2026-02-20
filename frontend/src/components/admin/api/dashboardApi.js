import axios from "axios";

const API_BASE = "http://localhost:8000";

export const dashboardApi = {
  getTickets: () => axios.get(`${API_BASE}/status`),
  getAgents: () => axios.get(`${API_BASE}/AgentUsers`),
  assignTicket: (payload) => axios.post(`${API_BASE}/assignedComplaints`, payload),
};