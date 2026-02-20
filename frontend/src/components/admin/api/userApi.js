import axios from "axios";

const API_BASE = "http://localhost:8000/api/admin";

export const userApi = {
  getOrdinaryUsers: () =>
    axios.get(`${API_BASE}/users`),

  getAgentUsers: () =>
    axios.get(`${API_BASE}/agents`),

  updateUser: (id, data) =>
  axios.put(`${API_BASE}/users/${id}`, data),

  deleteUser: (id) =>
    axios.delete(`${API_BASE}/users/${id}`),
};
