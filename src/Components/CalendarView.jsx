import React from "react";
import "./CalendarView.css";

const CalendarView = ({
  showFullYear = false,
  onDateClick,
  bookingDetails = {},
  selectedDate,
}) => {
  const today = new Date();
  const currentYear = today.getFullYear();

  const months = showFullYear
    ? Array.from({ length: 12 }, (_, i) => i)
    : [today.getMonth()];

  const renderMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks = [];
    let days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    while (days.length) {
      weeks.push(days.splice(0, 7));
    }

    return (
      <div key={`${year}-${month}`} className="month-container">
        <h3>{today.toLocaleString("default", { month: "long" })}</h3>
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
            const dateKey = date?.toISOString().split("T")[0];
            const bookingCount = bookingDetails[dateKey]
              ? bookingDetails[dateKey].reduce((acc, b) => acc + Number(b.items), 0)
              : 0;

            let bgColor = "";
            if (bookingCount >= 80) bgColor = "bg-blue";
            else if (bookingCount > 40) bgColor = "bg-yellow";
            else if (bookingCount > 0) bgColor = "bg-green";

            return (
              <div
                key={idx}
                className={`day-cell ${isSelected ? "selected" : ""}`}
                onClick={() => date && onDateClick && onDateClick(date)}
              >
                {day}
                {bookingCount > 0 && (
                  <span className="booking-count">*</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-wrapper">
      {months.map((month) => renderMonth(currentYear, month))}
    </div>
  );
};

export default CalendarView;