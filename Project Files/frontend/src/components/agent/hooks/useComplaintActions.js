import { useState, useEffect, useRef } from 'react';
import { complaintApi } from '../api/complaintApi';

export const useComplaintActions = (complaintId, onStatusUpdate) => {
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // Handle Click Outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowChat(false);
      }
    };
    if (showChat) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showChat]);

  const handleStatusChange = async (e) => {
    if (e) e.stopPropagation();
    setLoading(true);
    try {
      await complaintApi.updateStatus(complaintId, 'completed');
      if (onStatusUpdate) onStatusUpdate(complaintId, 'completed');
    } catch (error) {
      console.error("Status update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    showChat,
    setShowChat,
    loading,
    chatRef,
    handleStatusChange
  };
};