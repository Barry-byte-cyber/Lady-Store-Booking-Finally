import React from "react";
import "./calendarview.css";

const calendarview = ({ bookings = [], onDateClick, showFullYear = false }) => {
  const today = new Date();
  const currentYear = today.getFullYear();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const isBooked = (date) => {
    return bookings.some(
      (booking) => new Date(booking.date).toDateString() === date.toDateString()
    );
  };

  const renderMonth = (monthIndex) => {
    const monthName = new Date(currentYear, monthIndex).toLocaleString("default", {
      month: "long",
    });

    const daysInMonth = getDaysInMonth(currentYear, monthIndex);
    const firstDay = getFirstDayOfMonth(currentYear, monthIndex);

    const weeks = [];
    let week = new Array(firstDay).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return (
      <div className="month" key={monthName}>
        <h4>{monthName}</h4>
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div className="calendar-day header" key={day}>
              {day}
            </div>
          ))}
          {weeks.flat().map((day, i) => {
            const date = new Date(currentYear, monthIndex, day);
            const isActive = day && isBooked(date);

            return (
              <div
                key={i}
                className={`calendar-day ${isActive ? "booked" : ""} ${day ? "" : "empty"}`}
                onClick={() => day && onDateClick && onDateClick(date)}
              >
                {day || ""}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`calendar-container ${showFullYear ? "year-view" : ""}`}>
      {showFullYear
        ? Array.from({ length: 12 }, (_, i) => renderMonth(i))
        : renderMonth(today.getMonth())}
    </div>
  );
};

export default calendarview;