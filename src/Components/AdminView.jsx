import React, { useState, useEffect } from "react";
import { getBookings } from "../utils/storage";
import CalendarView from "./CalendarView";

function AdminView() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingsForDate, setBookingsForDate] = useState([]);
  const [allBookings, setAllBookings] = useState({});

  useEffect(() => {
    const storedBookings = getBookings();
    setAllBookings(storedBookings);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const bookings = allBookings[selectedDate] || [];
      setBookingsForDate(bookings);
    }
  }, [selectedDate, allBookings]);

  return (
    <div className="admin-view p-4">
      <h2 className="text-2xl font-bold mb-4">Admin View</h2>
      <CalendarView
{selectedDate && bookingDetails[selectedDate.toISOString().split("T")[0]]?.length > 0 && (
  <div style={{ marginTop: '20px', padding: '10px', border: '1px solid gray' }}>
    <h2>Bookings for {selectedDate.toDateString()}</h2>
    <ul>
      {bookingDetails[selectedDate.toISOString().split("T")[0]].map((booking, index) => (
        <li key={index}>
          <strong>{booking.name}</strong> — {booking.email} — {booking.items} items
        </li>
      ))}
    </ul>
  </div>
)}
        onDateClick={(date) => setSelectedDate(date)}
        showFullYear={true}
        bookingDetails={allBookings}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default AdminView;