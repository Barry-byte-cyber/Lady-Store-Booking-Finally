import React, { useState } from 'react';
import CalendarView from './CalendarView';

const AdminView = ({ allBookings }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'store123') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-2 py-1 rounded mb-2"
          placeholder="Enter admin password"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Calendar View</h2>
      <CalendarView bookings={allBookings} showFullYear={true} />
    </div>
  );
};

export default AdminView;