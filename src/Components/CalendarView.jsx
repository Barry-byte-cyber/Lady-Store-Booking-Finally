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
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }
    return weeks;
  };

  const renderMonth = (year, month) => {
    const weeks = generateCalendar(year, month);
    const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

    return (
      <div key={`${year}-${month}`} className="border rounded p-2 shadow m-2 w-[270px]">
        <h3 className="text-center font-bold mb-2">{monthName}</h3>
        <div className="grid grid-cols-7 gap-1 text-xs font-semibold text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        {weeks.map((week, i) => (
          <div key={i} className="grid grid-cols-7 gap-1 text-sm text-center">
            {week.map((day, j) => {
              const dateKey = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
              const isSelected = selectedDate === dateKey;
              const hasBookings = bookingDetails[dateKey];

              return (
                <div
                  key={j}
                  className={`h-6 cursor-pointer rounded ${day ? 'hover:bg-blue-100' : ''} ${isSelected ? 'bg-blue-300' : ''} ${hasBookings ? 'font-bold text-green-600' : ''}`}
                  onClick={() => day && onDateClick && onDateClick(dateKey)}
                >
                  {day || ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderYear = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      months.push(renderMonth(today.getFullYear(), month));
    }

    return (
      <div className="flex flex-wrap justify-center">
        {months}
      </div>
    );
  };

  return showFullYear ? renderYear() : renderMonth(today.getFullYear(), today.getMonth());
}