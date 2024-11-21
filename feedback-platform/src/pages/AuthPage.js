import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === 'customer') {
      navigate('/customer-home');
    } else if (role === 'client') {
      navigate('/client-home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Welcome to Engage
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Log in to continue
        </p>
        <button
          onClick={() => handleLogin('customer')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          Login as Customer
        </button>
        <button
          onClick={() => handleLogin('client')}
          className="w-full bg-green-500 text-white py-2 px-4 rounded"
        >
          Login as Client
        </button>
      </div>
    </div>
  );
};

export default AuthPage;