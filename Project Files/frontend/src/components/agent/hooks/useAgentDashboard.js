import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { agentApi } from '../api/agentApi';

export const useAgentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      // Auth Guard: If no user in storage, boot to login
      if (!storedUser) {
        navigate('/');
        return;
      }
      
      setUser(storedUser);
      const response = await agentApi.getAssignedComplaints(storedUser._id);
      setComplaints(response.data || []);
      
    } catch (error) {
      console.error("Agent Dashboard sync failed:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle local state updates (e.g., marking a ticket as solved)
  const updateComplaintLocally = (id, newStatus) => {
    setComplaints(prevList => 
      prevList.map(item => {
        if (item._doc && item._doc.complaintId === id) {
          return { ...item, _doc: { ...item._doc, status: newStatus } };
        }
        return item;
      })
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return {
    state: { user, complaints, loading, refreshing },
    actions: { fetchData, updateComplaintLocally, handleLogout }
  };
};