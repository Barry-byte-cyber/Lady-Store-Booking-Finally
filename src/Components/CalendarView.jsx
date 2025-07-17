import React from "react";
import "./CalendarView.css";

const CalendarView = ({ onDateClick }) => {
  const today = new Date();
  const year = today.getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => {
    const firstDay = new Date(year, i, 1);
    const daysInMonth = new Date(year, i + 1, 0).getDate();

    const monthDays = [];
    const startDay = firstDay.getDay(); // 0 = Sunday

    for (let x = 0; x < startDay; x++) {
      monthDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, i, day);
      monthDays.push(date);
    }

    return { month: i, days: monthDays };
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar-grid">
      {months.map(({ month, days }) => (
        <div key={month} className="month-container">
          <h3>{monthNames[month]}</h3>
          <div className="weekday-row">
            {weekDays.map((day) => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>
          <div className="days-grid">
            {days.map((date, idx) => (
              <div key={idx} className="day-cell">
                {date ? (
                  <button
                    onClick={() =>
                      onDateClick && onDateClick(date.toISOString().split("T")[0])
                    }
                    className="calendar-day-btn"
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="empty-cell" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarView;