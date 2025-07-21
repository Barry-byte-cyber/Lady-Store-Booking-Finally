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
    const weeks = generateCalendar(year, month);
    const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

    return (
      <div key={`${year}-${month}`} className="border rounded p-2 m-2 w-full sm:w-[300px]">
        <h3 className="text-center font-bold">{monthName}</h3>
        <div className="grid grid-cols-7 text-xs font-semibold text-center mt-2 mb-1">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 text-center text-sm">
            {week.map((day, di) => {
              const dateKey = day
                ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                : null;

              return (
                <div
                  key={di}
                  className={`p-1 border h-10 flex items-center justify-center cursor-pointer hover:bg-blue-100 ${
                    selectedDate === dateKey ? "bg-blue-200" : ""
                  }`}
                  onClick={() => day && onDateClick && onDateClick(dateKey)}
                >
                  {day || ""}
                </div>
              );
            })}
          </div>
        ))}
        {selectedDate &&
          new Date(selectedDate).getMonth() === month &&
          bookingDetails[selectedDate] && (
            <div className="mt-2 text-sm bg-gray-100 p-2 rounded shadow">
              <h4 className="font-semibold mb-1">Bookings for {selectedDate}</h4>
              <ul className="list-disc list-inside">
                {bookingDetails[selectedDate].map((booking, index) => (
                  <li key={index}>
                    {booking.name} - {booking.items} items @ {booking.time}
                  </li>
                ))}
              </ul>
            </div>
          )}
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