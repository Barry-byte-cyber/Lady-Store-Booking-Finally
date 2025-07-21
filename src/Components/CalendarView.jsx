import React from "react";

function CalendarView({ onDateClick, showFullYear = false, bookingDetails = {}, selectedDate = null }) {
  const today = new Date();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();
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
      weeks.push(week);
    }
    return weeks;
  };

  const renderCalendar = (year, month) => {
    const weeks = generateCalendar(year, month);
    const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

    return (
      <div className="calendar border rounded-lg shadow p-2 w-full max-w-xs m-2">
        <h3 className="text-center font-semibold text-lg mb-2">{monthName}</h3>
        <div className="grid grid-cols-7 text-xs font-semibold text-center border-b pb-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        {weeks.map((week, i) => (
          <div key={i} className="grid grid-cols-7 text-sm text-center">
            {week.map((day, j) => {
              const fullDate = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
              const hasBooking = fullDate && bookingDetails[fullDate];
              const isSelected = selectedDate === fullDate;

              return (
                <div
                  key={j}
                  className={`p-1 cursor-pointer border ${
                    day ? "hover:bg-blue-100" : ""
                  } ${isSelected ? "bg-yellow-200" : ""}`}
                  onClick={() => day && onDateClick && onDateClick(fullDate)}
                >
                  {day || ""}
                  {hasBooking && <div className="text-[10px] text-green-600">📦</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  if (showFullYear) {
    const months = [];
    for (let m = 0; m < 12; m++) {
      months.push(renderCalendar(currentYear, m));
    }
    return <div className="flex flex-wrap justify-center">{months}</div>;
  }

  return renderCalendar(currentYear, currentMonth);
}

export default CalendarView;