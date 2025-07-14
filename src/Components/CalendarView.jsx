import React, { useEffect, useState } from "react";

const CalendarView = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  const countItemsByDate = () => {
    const counts = {};
    bookings.forEach((booking) => {
      const date = booking.date;
      const items = parseInt(booking.items, 10) || 0;
      counts[date] = (counts[date] || 0) + items;
    });
    return counts;
  };

  const isDayFullyBooked = (dateStr, counts) => {
    return (counts[dateStr] || 0) >= 80;
  };

  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const counts = countItemsByDate();
    const months = Array.from({ length: 12 }, (_, i) => i); // 0 to 11

    return months.map((month) => {
      const firstDay = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const startWeekday = firstDay.getDay();
      const rows = [];
      let cells = [];

      // Fill empty cells before the first of the month
      for (let i = 0; i < startWeekday; i++) {
        cells.push(<td key={`empty-${i}`}></td>);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const isFull = isDayFullyBooked(dateStr, counts);
        const itemCount = counts[dateStr] || 0;

        cells.push(
          <td
            key={day}
            style={{
              backgroundColor: isFull ? "#007BFF" : "#e0ffe0",
              color: isFull ? "white" : "black",
              textAlign: "center",
              padding: "4px",
              borderRadius: "6px",
            }}
          >
            {day}
            <br />
            <small>{itemCount}/80</small>
          </td>
        );

        if ((cells.length) % 7 === 0 || day === daysInMonth) {
          rows.push(<tr key={`row-${day}`}>{cells}</tr>);
          cells = [];
        }
      }

      return (
        <div key={month} style={{ marginBottom: "32px", minWidth: "300px" }}>
          <h4 style={{ textAlign: "center" }}>{new Date(year, month).toLocaleString("default", { month: "long" })}</h4>
          <table style={{ width: "100%", borderSpacing: "4px" }}>
            <thead>
              <tr>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <th key={d}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div style={{ padding: "1rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
      {generateCalendar()}
    </div>
  );
};

export default CalendarView;