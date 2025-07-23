import React, { useEffect, useState } from "react";
import CalendarView from "./CalendarView";

const AdminView = () => {
  const [allBookings, setAllBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingsForDate, setBookingsForDate] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "{}");
    setAllBookings(storedBookings);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      const bookings = allBookings[dateKey] || [];
      setBookingsForDate(bookings);
    }
  }, [selectedDate, allBookings]);

  return (
    <div className="admin-view p-4">
      <h2 className="text-2xl font-bold mb-4">Admin View</h2>
      <CalendarView
        showFullYear={true}
        onDateClick={(date) => setSelectedDate(date)}
        bookingDetails={allBookings}
        selectedDate={selectedDate}
      />
      {selectedDate && bookingsForDate.length > 0 && (
        <div className="mt-4 border p-4">
          <h3 className="font-semibold mb-2">
            Bookings for {selectedDate.toDateString()}
          </h3>
          <ul>
            {bookingsForDate.map((b, i) => (
              <li key={i}>
                <strong>{b.name}</strong> – {b.email} – {b.items} items
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminView;