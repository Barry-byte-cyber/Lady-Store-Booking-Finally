import React from "react";
import "./CalendarView.css";

const CalendarView = ({ showFullYear = false, onDateClick, bookingDetails = {}, selectedDate }) => {
  const today = new Date();

  const renderMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks = [];
    let days = [];

    const startDay = firstDay.getDay(); // Sunday = 0
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    while (days.length) {
      weeks.push(days.splice(0, 7));
    }

    return (
      <div className="month-container" key={month}>
        <h3>{today.toLocaleString("default", { month })}</h3>
        <div className="calendar-grid">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d} className="day-header">{d}</div>
          ))}
          {weeks.flat().map((date, idx) => {
            const isSelected =
              date &&
              selectedDate &&
              date.toDateString() === selectedDate.toDateString();
            const day = date ? date.getDate() : "";

            const bookingCount = date
              ? (bookingDetails[date.toISOString().split("T")[0]]?.length || 0)
              : 0;

            return (
              <div
                key={idx}
                className={`day-cell ${isSelected ? "selected" : ""}`}
                onClick={() => date && onDateClick && onDateClick(date)}
              >
                {day}
                {bookingCount > 0 && <span className="booking-count">*</span>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const currentYear = today.getFullYear();
  const months = showFullYear
    ? Array.from({ length: 12 }, (_, i) => i)
    : [today.getMonth()];

  return (
    <div className="calendar-wrapper">
      {months.map((month) => renderMonth(currentYear, month))}
    </div>
  );
};

export default CalendarView;