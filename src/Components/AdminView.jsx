import React, { useState, useEffect } from "react";

const AdminView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const bookingsByDate = bookings.reduce((acc, booking) => {
    const date = booking.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(booking);
    return acc;
  }, {});

  // Build the calendar grid
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 = January

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay(); // 0 = Sunday
  const totalDays = lastDayOfMonth.getDate();

  const dates = [];

  for (let i = 0; i < startDay; i++) {
    dates.push(null); // filler for alignment
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = dateObj.toISOString().split("T")[0];
    dates.push(dateStr);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin View – Bookings Calendar</h1>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="font-bold text-center">{day}</div>
        ))}

        {dates.map((dateStr, index) => {
          if (!dateStr) {
            return <div key={index}></div>; // empty cell
          }

          const bookingCount = bookingsByDate[dateStr]?.reduce(
            (sum, b) => sum + Number(b.items),
            0
          );

          return (
            <button
              key={index}
              className={`w-full h-12 rounded-md text-sm ${
                bookingCount > 0 ? "bg-blue-400 text-white hover:bg-blue-600" : "bg-gray-100"
              }`}
              onClick={() => setSelectedDate(dateStr)}
            >
              {new Date(dateStr).getDate()}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="p-4 bg-white border rounded shadow">
          <h2 className="text-lg font-semibold mb-2">
            Bookings for {selectedDate}
          </h2>
          {bookingsByDate[selectedDate]?.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {bookingsByDate[selectedDate].map((b, idx) => (
                <li key={idx}>
                  <strong>{b.name}</strong> ({b.email}) — {b.items} items at {b.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings for this day.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminView;