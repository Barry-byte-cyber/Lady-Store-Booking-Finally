import React, { useState } from "react";
import CalendarView from "./CalendarView";
import { useNavigate } from "react-router-dom";

const AdminView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const filteredBookings = selectedDate
    ? bookings.filter((b) => b.date === selectedDate)
    : [];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin");
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setExpanded(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin View – All Bookings</h2>
        <button
          onClick={handleLogout}
          className="ml-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Calendar View</h3>
        <CalendarView
          onDateClick={handleDateClick}
          highlightType="admin"
        />
      </div>

      {expanded && selectedDate && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            Bookings for <span className="text-blue-600">{selectedDate}</span>
          </h3>
          {filteredBookings.length > 0 ? (
            <table className="w-full border-collapse">
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
          ) : (
            <p className="text-gray-600">No bookings for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminView;