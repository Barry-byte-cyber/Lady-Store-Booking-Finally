import React, { useState } from "react";
import CalendarView from "../components/calendarview";
import { getBookingsForDate } from "../utils";

const AdminView = ({ bookings, onLogout }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const bookingsForDate = selectedDate ? getBookingsForDate(bookings, selectedDate) : [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin View – Bookings Calendar</h2>
      <button onClick={onLogout} className="mb-4 px-3 py-1 border rounded">
        Logout
      </button>

      <h3 className="text-xl font-semibold mb-2">Bookings Calendar</h3>
      <CalendarView
        bookings={bookings}
        onDateClick={(date) => setSelectedDate(date)}
        showFullYear={true}
      />

      {selectedDate && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">
            Bookings for {selectedDate.toISOString().split("T")[0]}:
          </h4>
          <table className="min-w-full text-sm border border-collapse border-gray-300">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Time</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {bookingsForDate.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.time}</td>
                  <td>{booking.quantity}</td>
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