import React, { useState } from "react";
import CalendarView from "./CalendarView";
import { useNavigate } from "react-router-dom";

const AdminView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin");
  };

  const filteredBookings = selectedDate
    ? bookings.filter((b) => b.date === selectedDate)
    : [];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin View – Bookings Calendar</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
  <h3 className="text-xl font-semibold mb-2">Bookings Calendar</h3>
  <CalendarView
    onDateClick={(date) => setSelectedDate(date)}
  />
</div>

      {selectedDate && (
        <div>
          <h4 className="text-lg font-semibold mt-4">
            Bookings for {selectedDate}:
          </h4>
          <table className="mt-2 w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2">Name</th>
                <th className="border px-2">Email</th>
                <th className="border px-2">Time</th>
                <th className="border px-2">Items</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b, i) => (
                <tr key={i} className="text-center">
                  <td className="border px-2">{b.name}</td>
                  <td className="border px-2">{b.email}</td>
                  <td className="border px-2">{b.time}</td>
                  <td className="border px-2">{b.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminView;