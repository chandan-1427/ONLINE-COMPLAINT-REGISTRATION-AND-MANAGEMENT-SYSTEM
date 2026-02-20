import { useState, useEffect, useCallback, useMemo } from "react";
import { dashboardApi } from "../api/dashboardApi";

export const useDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [ticketsRes, agentsRes] = await Promise.all([
        dashboardApi.getTickets(),
        dashboardApi.getAgents()
      ]);
      setComplaints(ticketsRes.data || []);
      setAgents(agentsRes.data || []);
    } catch {
      setError("Dashboard sync failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Statistics Calculation
  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'pending').length;
    const completed = complaints.filter(c => c.status === 'completed').length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, pending, completed, rate };
  }, [complaints]);

  // Filtering Logic
  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.comment.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || c.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [complaints, searchTerm, filterStatus]);

  const handleAssign = async () => {
    if (!selectedAssignment) return;
    const { agent, complaint } = selectedAssignment;
    
    setProcessing(true);
    try {
      await dashboardApi.assignTicket({
        agentId: agent._id,
        complaintId: complaint._id,
        status: complaint.status,
        agentName: agent.name,
      });
      setComplaints(prev => prev.filter(c => c._id !== complaint._id));
      setSuccess(`Ticket assigned to ${agent.name}`);
      setShowModal(false);
    } catch {
      setError("Assignment failed.");
    } finally {
      setProcessing(false);
    }
  };

  return {
    state: { complaints: filteredComplaints, agents, loading, processing, error, success, searchTerm, filterStatus, stats, showModal, selectedAssignment },
    actions: { setSearchTerm, setFilterStatus, setError, setSuccess, setShowModal, setSelectedAssignment, handleAssign }
  };
};