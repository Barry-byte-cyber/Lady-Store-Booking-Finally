import React, { useState, useEffect } from "react";
import { getBookings } from "../utils/storage";
import BookingDetails from "./BookingDetails";
import CalendarView from "./CalendarView";

const AdminView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingsForDate, setBookingsForDate] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const bookings = getBookings().filter(
        (booking) => booking.date === selectedDate
      );
      setBookingsForDate(bookings);
    }
  }, [selectedDate]);

  return (
    <div className="admin-view p-4">
      <h2 className="text-2xl font-bold mb-4">Admin View</h2>
      <CalendarView
        onDateClick={(date) => setSelectedDate(date)}
        showFullYear={true}
      />
      {selectedDate && bookingsForDate.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">
            Bookings for {selectedDate}
          </h3>
          <BookingDetails bookings={bookingsForDate} />
        </div>
      )}
      {selectedDate && bookingsForDate.length === 0 && (
        <p className="mt-4">No bookings for {selectedDate}.</p>
      )}
    </div>
  );
};

export default AdminView;