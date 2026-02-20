import axios from 'axios';

const API_BASE = "http://localhost:8000/api/users";

export const userApi = {
  submitComplaint: (userId, data) =>
    axios.post(`${API_BASE}/${userId}/complaints`, {
      ...data,
      status: "pending"
    })
};
