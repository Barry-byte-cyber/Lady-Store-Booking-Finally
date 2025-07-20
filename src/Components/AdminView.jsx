import React, { useState, useEffect } from "react";
import CalendarView from "./CalendarView";

const AdminView = () => {
  const [bookingsByDate, setBookingsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const grouped = bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) acc[booking.date] = [];
      acc[booking.date].push(booking);
      return acc;
    }, {});
    setBookingsByDate(grouped);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Booking Overview</h2>
      <CalendarView
        bookingsByDate={bookingsByDate}
        onDateClick={handleDateClick}
        showFullYear={true}
      />
      {selectedDate && bookingsByDate[selectedDate] && (
        <div style={{ marginTop: "30px" }}>
          <h3>Bookings for {selectedDate}</h3>
          <ul>
            {bookingsByDate[selectedDate].map((b, index) => (
              <li key={index}>
                <strong>Name:</strong> {b.name} | <strong>Email:</strong> {b.email} |{" "}
                <strong>Time Slot:</strong> {b.time} | <strong>Items:</strong> {b.items}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminView;