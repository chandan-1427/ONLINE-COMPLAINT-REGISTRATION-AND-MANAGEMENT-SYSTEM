import axios from "axios";

const API_BASE = "http://localhost:8000/api/admin";

export const dashboardApi = {
  getTickets: () => axios.get(`${API_BASE}/complaints`),

  getAgents: () => axios.get(`${API_BASE}/agents`),

  assignTicket: (payload) =>
    axios.post(`${API_BASE}/assign`, payload),
};
