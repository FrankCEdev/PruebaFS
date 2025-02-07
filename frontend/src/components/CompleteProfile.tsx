import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../services/api';

export const CompleteProfile: React.FC = () => {const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    profileImage: null as File | null
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    
    try {
      await updateUserProfile(data);
      navigate('/welcome');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Completa tu información</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Foto de perfil</label>
          <input
            type="file"
            onChange={(e) => setFormData({
              ...formData,
              profileImage: e.target.files?.[0] || null
            })}
            className="w-full"
            />
        </div>
          
        
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;