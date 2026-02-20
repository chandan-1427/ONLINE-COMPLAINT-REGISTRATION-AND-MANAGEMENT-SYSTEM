import { useState } from 'react';
import { userApi } from '../api/userApi';

export const useComplaintForm = (userId) => {
  const initialState = {
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    comment: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Client-side verification: Pincode should only be numbers
    if (name === 'pincode' && value !== '' && !/^\d+$/.test(value)) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setFormData(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side Validation
    if (formData.pincode.length !== 6) {
      alert("Please enter a valid 6-digit Pincode");
      return;
    }

    setLoading(true);
    try {
      await userApi.submitComplaint(userId, formData);
      alert("Complaint registered successfully!");
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to send complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};