import { useState, useEffect, useCallback, useMemo } from "react";
import { userApi } from "../api/userApi";

export const useUserManagement = (userType = "ordinary") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");

  const [modals, setModals] = useState({ edit: false, delete: false });
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = userType === "agent" 
        ? await userApi.getAgentUsers() 
        : await userApi.getOrdinaryUsers();
      setData(res.data || []);
    } catch {
      setError("Sync failed. Check connection.");
    } finally {
      setLoading(false);
    }
  }, [userType]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredData = useMemo(() => {
    return data.filter(u => 
      u.name?.toLowerCase().includes(search.toLowerCase()) || 
      u.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const handleUpdate = async () => {
    setProcessing(true);
    try {
      await userApi.updateUser(selectedItem._id, editData);
      setData(prev => prev.map(u => u._id === selectedItem._id ? { ...u, ...editData } : u));
      setSuccess("Account updated successfully.");
      setModals(p => ({ ...p, edit: false }));
    } catch {
      setError("Update failed.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async () => {
    setProcessing(true);
    try {
      await userApi.deleteUser(selectedItem._id);
      setData(prev => prev.filter(u => u._id !== selectedItem._id));
      setSuccess("Account removed.");
      setModals(p => ({ ...p, delete: false }));
    } catch {
      setError("Deletion failed.");
    } finally {
      setProcessing(false);
    }
  };

  return {
    state: { filteredData, loading, processing, error, success, search, modals, selectedItem, editData, total: data.length },
    actions: { setSearch, setModals, setSelectedItem, setEditData, setError, setSuccess, handleUpdate, handleDelete }
  };
};