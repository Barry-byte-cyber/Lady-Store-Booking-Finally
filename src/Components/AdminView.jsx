import React, { useState } from "react";
import CalendarView from "./CalendarView";

function AdminView() {
  const [selectedDate, setSelectedDate] = useState(null);
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  const bookingsForSelectedDate = bookings.filter(
    (booking) => booking.date === selectedDate
  );

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin View – Bookings Calendar</h2>
      <button onClick={handleLogout}>Logout</button>
      <CalendarView
        bookings={bookings}
        onDateClick={setSelectedDate}
        showFullYear={true}
      />
      {selectedDate && (
        <div>
          <h3>Bookings for {selectedDate}:</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Time</th><th>Items</th>
              </tr>
            </thead>
            <tbody>
              {bookingsForSelectedDate.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.time}</td>
                  <td>{booking.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminView;