import React, { useEffect, useState } from "react";

const AdminView = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Bookings (Admin View)</h2>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Name</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Email</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Date</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Time</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Items</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td style={{ padding: "0.5rem" }}>{booking.name}</td>
                <td style={{ padding: "0.5rem" }}>{booking.email}</td>
                <td style={{ padding: "0.5rem" }}>{booking.date}</td>
                <td style={{ padding: "0.5rem" }}>{booking.time}</td>
                <td style={{ padding: "0.5rem" }}>{booking.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminView;