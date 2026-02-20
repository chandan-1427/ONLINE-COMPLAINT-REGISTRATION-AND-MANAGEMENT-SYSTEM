import axios from 'axios';

const API_BASE = "http://localhost:8000/api/agent";

export const complaintApi = {
  updateStatus: (complaintId, status) =>
    axios.put(
      `${API_BASE}/complaints/${complaintId}`,
      { status }
    ),
};
