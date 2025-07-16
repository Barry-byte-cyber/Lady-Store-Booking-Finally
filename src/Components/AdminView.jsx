import React, { useState } from "react";
import CalendarView from "./CalendarView";
import { useNavigate } from "react-router-dom";

const AdminView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const filteredBookings = selectedDate
    ? bookings.filter((b) => b.date === selectedDate)
    : [];

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
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <CalendarView onDateClick={(date) => setSelectedDate(date)} />
      </div>

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">
            Bookings for {selectedDate}
          </h3>
          {filteredBookings.length > 0 ? (
            <ul className="space-y-2">
              {filteredBookings.map((b, index) => (
                <li
                  key={index}
                  className="border p-3 rounded shadow-sm bg-white"
                >
                  <p><strong>Name:</strong> {b.name}</p>
                  <p><strong>Email:</strong> {b.email}</p>
                  <p><strong>Time:</strong> {b.time}</p>
                  <p><strong>Items:</strong> {b.items}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminView;