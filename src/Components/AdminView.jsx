import React, { useState } from 'react';
import CalendarView from './CalendarView';

const AdminView = ({ bookings }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'store123') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="p-4">
      {!isLoggedIn ? (
        <div className="space-y-2">
          <h2 className="font-bold text-lg">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button onClick={handleLogin} className="bg-black text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">Admin Calendar View</h2>
          <CalendarView bookings={bookings} showFullYear={true} />
        </>
      )}
    </div>
  );
};

export default AdminView;