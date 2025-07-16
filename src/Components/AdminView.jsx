import React, { useState } from "react";
import CalendarView from "./CalendarView";
import { useNavigate } from "react-router-dom";

const AdminView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const filteredBookings = bookings.filter(
    (b) => selectedDate && b.date === selectedDate
  );

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin View – Bookings Calendar</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <CalendarView onDateClick={(date) => setSelectedDate(date)} />

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">
            Bookings for {selectedDate}:
          </h3>
          {filteredBookings.length === 0 ? (
            <p>No bookings for this date.</p>
          ) : (
            <table className="w-full table-auto border-collapse mt-2">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Time</th>
                  <th className="border px-2 py-1">Items</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{b.name}</td>
                    <td className="border px-2 py-1">{b.email}</td>
                    <td className="border px-2 py-1">{b.time}</td>
                    <td className="border px-2 py-1">{b.items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminView;