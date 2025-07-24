import React from "react";

function CalendarView({ bookings = {}, onDateClick = null, showFullYear = true }) {
  const today = new Date();

  // Generate 12 months
  const months = Array.from({ length: 12 }, (_, monthIndex) => {
    const firstDayOfMonth = new Date(today.getFullYear(), monthIndex, 1);
    const daysInMonth = new Date(today.getFullYear(), monthIndex + 1, 0).getDate();
    const startingDay = firstDayOfMonth.getDay();

    const daysArray = [];
    for (let i = 0; i < startingDay; i++) {
      daysArray.push(null); // empty cells for spacing
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${today.getFullYear()}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      daysArray.push({ day, dateStr });
    }

    return { name: firstDayOfMonth.toLocaleString('default', { month: 'long' }), daysArray };
  });

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {months.map((month, monthIndex) => (
        <div key={monthIndex} className="border rounded-lg shadow p-2">
          <h2 className="text-lg font-bold text-center mb-2">{month.name}</h2>
          <div className="grid grid-cols-7 gap-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="text-xs text-center font-semibold">{d}</div>
            ))}
            {month.daysArray.map((dateObj, i) => (
              <div
                key={i}
                className={`h-16 border flex flex-col items-center justify-center text-sm cursor-pointer
                  ${dateObj?.dateStr && bookings[dateObj.dateStr]?.totalItems > 0 ?
                  bookings[dateObj.dateStr].totalItems >= 80 ? "bg-red-200" :
                  bookings[dateObj.dateStr].totalItems >= 40 ? "bg-yellow-100" : "bg-green-100"
                  : ""}`}
                onClick={() => dateObj?.dateStr && onDateClick && onDateClick(dateObj.dateStr)}
              >
                <div>{dateObj?.day || ""}</div>
                {dateObj?.dateStr && bookings[dateObj.dateStr]?.totalItems > 0 && (
                  <div className="text-xs font-semibold">
                    {bookings[dateObj.dateStr].totalItems}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CalendarView;