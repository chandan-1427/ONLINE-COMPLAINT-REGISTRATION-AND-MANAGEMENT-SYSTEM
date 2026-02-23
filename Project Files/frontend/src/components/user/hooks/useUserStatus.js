import { useState, useEffect, useCallback } from 'react';
import { statusApi } from '../api/statusApi';

export const useUserStatus = (userId) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeChatId, setActiveChatId] = useState(null);

  const fetchStatus = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await statusApi.getUserComplaints(userId);
      setComplaints(res.data || []);
    } catch (err) {
      setError("Failed to sync your records.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    state: { complaints, loading, error, activeChatId },
    actions: { setActiveChatId, fetchStatus }
  };
};