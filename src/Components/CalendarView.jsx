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
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }

    return weeks;
  };

  const renderMonth = (year, month) => {
    const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
    const weeks = generateCalendar(year, month);
    const isSelectedMonth = selectedDate && selectedDate.getMonth() === month;

    return (
      <div key={`${year}-${month}`} className="border rounded p-2 m-2 w-full sm:w-[300px] shadow">
        <h3 className="text-center font-bold mb-2">{monthName}</h3>
        <div className="grid grid-cols-7 gap-1 text-xs font-semibold text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              const date = day ? new Date(year, month, day) : null;
              const isSelected = date && selectedDate && date.toDateString() === selectedDate.toDateString();
              const bookingCount = date ? (bookingDetails[date.toISOString().split("T")[0]]?.length || 0) : 0;

              return (
                <div
                  key={`${wi}-${di}`}
                  className={`border h-8 flex items-center justify-center cursor-pointer rounded-sm ${
                    isSelected ? "bg-blue-300" : ""
                  }`}
                  onClick={() => date && onDateClick && onDateClick(date)}
                >
                  {day || ""}
                  {bookingCount > 0 && <span className="text-[10px] ml-1 text-red-500">*</span>}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const currentYear = today.getFullYear();
  const months = showFullYear ? Array.from({ length: 12 }, (_, i) => i) : [today.getMonth()];

  return (
    <div className="flex flex-wrap justify-center">
      {months.map((month) => renderMonth(currentYear, month))}
    </div>
  );
}

export default CalendarView;