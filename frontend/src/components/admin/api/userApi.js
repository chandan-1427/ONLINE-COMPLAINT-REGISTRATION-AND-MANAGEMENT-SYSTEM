import axios from "axios";

const API_BASE = "http://localhost:8000";

export const userApi = {
  getOrdinaryUsers: () => axios.get(`${API_BASE}/OrdinaryUsers`),
  getAgentUsers: () => axios.get(`${API_BASE}/AgentUsers`),
  updateUser: (id, data) => axios.put(`${API_BASE}/user/${id}`, data),
  deleteUser: (id) => axios.delete(`${API_BASE}/OrdinaryUsers/${id}`),
};