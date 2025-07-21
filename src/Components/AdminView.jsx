import React, { useState, useEffect } from "react";
import { getBookingsForDate } from "../utils/storage";
import BookingDetails from "./BookingDetails";
import CalendarView from "./CalendarView";

const AdminView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingsForDate, setBookingsForDate] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const bookings = getBookingsForDate(selectedDate);
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

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">
            Bookings for {selectedDate.toDateString()}
          </h3>
          {bookingsForDate.length > 0 ? (
            <ul className="space-y-2">
              {bookingsForDate.map((booking, index) => (
                <li
                  key={index}
                  className="border p-2 rounded bg-gray-100 shadow"
                >
                  <BookingDetails booking={booking} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminView;