import React, { useEffect, useState } from "react";

const AdminView = () => {
  const [bookingsByDate, setBookingsByDate] = useState({});

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const grouped = bookings.reduce((acc, booking) => {
      const date = booking.date;
      const items = Number(booking.items);
      if (!acc[date]) {
        acc[date] = { total: 0, entries: [] };
      }
      acc[date].total += items;
      acc[date].entries.push(booking);
      return acc;
    }, {});

    setBookingsByDate(grouped);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin View - All Bookings</h2>
      {Object.keys(bookingsByDate).length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        Object.entries(bookingsByDate).map(([date, { total, entries }]) => (
          <div key={date} style={{ marginBottom: "2rem" }}>
            <h3>{date} - Total Items: {total}</h3>
            <ul>
              {entries.map((entry, idx) => (
                <li key={idx}>
                  {entry.name} ({entry.email}) - {entry.items} items
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminView;