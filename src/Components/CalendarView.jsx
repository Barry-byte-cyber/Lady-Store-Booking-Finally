import React from "react";
import "./CalendarView.css";

const CalendarView = ({ onDateClick }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)

  const dates = [];

  // Fill in blanks for days before 1st
  for (let i = 0; i < startDay; i++) {
    dates.push(null);
  }

  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month, day));
  }

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Bookings Calendar</h2>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="calendar-header">{d}</div>
        ))}

        {dates.map((date, i) => (
          <div
            key={i}
            className={`calendar-cell ${date ? "clickable" : "empty"}`}
            onClick={() => date && onDateClick && onDateClick(date.toISOString().split("T")[0])}
          >
            {date ? date.getDate() : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;