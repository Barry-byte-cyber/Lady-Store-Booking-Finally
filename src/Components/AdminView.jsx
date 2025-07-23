import React, { useEffect, useState } from 'react';
import CalendarView from "./CalendarView";

const AdminView = () => {
  const [allBookings, setAllBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingsForDate, setBookingsForDate] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || {};
    setAllBookings(storedBookings);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const bookings = allBookings[selectedDate.toISOString().split("T")[0]] || [];
      setBookingsForDate(bookings);
    }
  }, [selectedDate, allBookings]);

  return (
    <div className="admin-view p-4">
      <h2 className="text-2xl font-bold mb-4">Admin View</h2>
      <CalendarView
        onDateClick={(date) => setSelectedDate(date)}
        showFullYear={true}
        bookingDetails={bookings}
        selectedDate={selectedDate}
      />

      {selectedDate && bookingsForDate.length > 0 && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid gray' }}>
          <h2>Bookings for {selectedDate.toDateString()}</h2>
          <ul>
            {bookingsForDate.map((booking, index) => (
              <li key={index}>
                <strong>{booking.name}</strong> — {booking.email} — {booking.items} items
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminView;