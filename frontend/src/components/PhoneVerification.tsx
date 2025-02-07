import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { verifyPhone, verifyOTP } from '../services/api';

export const PhoneVerification: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyPhone(phone);
      setShowOtp(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyOTP(phone, otp);
      if (response.isProfileComplete) {
        navigate('/welcome');
      } else {
        navigate('/complete-profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-primary p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg p-6">
        {!showOtp ? (
          <form onSubmit={handlePhoneSubmit}>
            <h2 className="text-2xl font-bold mb-4">Ingresa tu número</h2>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="+503 7777-7777"
            />
            <button
              type="submit"
              className="w-full mt-4 bg-secondary text-white p-2 rounded"
            >
              Continuar
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <h2 className="text-2xl font-bold mb-4">Ingresa el código</h2>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderInput={(props) => <input {...props} />}
              containerStyle="flex justify-between gap-2"
              inputStyle="w-16 h-16 border rounded text-center text-2xl"
            />
            <button
              type="submit"
              className="w-full mt-4 bg-secondary text-white p-2 rounded"
            >
              Verificar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};