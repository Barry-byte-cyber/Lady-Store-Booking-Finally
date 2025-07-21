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
        onDateClick={(date) => setSelectedDate(date)}
        showFullYear={true}
        bookingDetails={allBookings}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default AdminView;