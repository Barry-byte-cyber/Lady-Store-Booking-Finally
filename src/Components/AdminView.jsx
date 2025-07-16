""import React, { useState } from "react";
import CalendarView from "./CalendarView";

const AdminView = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const filteredBookings = selectedDate
    ? bookings.filter((b) => b.date === selectedDate)
    : [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin View – All Bookings</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Calendar View</h3>
        <CalendarView onDateClick={(date) => setSelectedDate(date)} />
      </div>

      {selectedDate && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            Bookings for {selectedDate}:
          </h3>
          {filteredBookings.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Time</th>
                  <th className="border px-2 py-1">Items</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{b.name}</td>
                    <td className="border px-2 py-1">{b.email}</td>
                    <td className="border px-2 py-1">{b.date}</td>
                    <td className="border px-2 py-1">{b.time}</td>
                    <td className="border px-2 py-1">{b.items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bookings on this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminView;