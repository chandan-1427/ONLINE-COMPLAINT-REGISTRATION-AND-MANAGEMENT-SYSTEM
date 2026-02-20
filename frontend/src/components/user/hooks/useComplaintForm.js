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
      /** * ✅ FIX: Injecting the required 'status' field here.
       * This ensures your Mongoose Schema validation passes.
       */
      const complaintData = {
        ...formData,
        status: 'pending' 
      };

      await userApi.submitComplaint(userId, complaintData);
      
      alert("Your Official Complaint has been filed successfully!");
      resetForm();
    } catch (err) {
      console.error("Backend Validation Error:", err.response?.data || err.message);
      alert("Something went wrong while submitting the record.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};