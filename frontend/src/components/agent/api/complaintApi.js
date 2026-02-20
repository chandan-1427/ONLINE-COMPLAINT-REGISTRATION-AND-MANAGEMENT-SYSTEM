import axios from 'axios';

const API_BASE = "http://localhost:8000";

export const complaintApi = {
  updateStatus: (id, status) => 
    axios.put(`${API_BASE}/complaint/${id}`, { status }),
};