import React from "react";

function CalendarView({
  onDateClick,
  showFullYear = false,
  bookings = {},
  selectedDate = null,
}) {
  const today = new Date();

  const generateMonths = () => {
    const months = [];
    const currentYear = today.getFullYear();

    for (let month = 0; month < 12; month++) {
      const firstDay = new Date(currentYear, month, 1);
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
      const startDay = firstDay.getDay();
      const weeks = [];
      let day = 1 - startDay;

      for (let week = 0; week < 6; week++) {
        const days = [];
        for (let i = 0; i < 7; i++) {
          const current = new Date(currentYear, month, day);
          const dateKey = current.toISOString().split("T")[0];
          const bookingCount = bookings[dateKey] || 0;
          const isCurrentMonth = current.getMonth() === month;

          days.push(
            <div
              key={i}
              onClick={() => isCurrentMonth && onDateClick && onDateClick(dateKey)}
              className={`h-20 border p-1 text-center cursor-pointer ${
                isCurrentMonth ? "bg-white hover:bg-blue-100" : "bg-gray-100 text-gray-400"
              } ${selectedDate === dateKey ? "border-2 border-blue-600" : ""}`}
            >
              <div className="font-bold">{isCurrentMonth ? current.getDate() : ""}</div>
              {isCurrentMonth && bookingCount > 0 && (
                <div className="text-xs text-green-700 font-semibold">
                  {bookingCount}
                </div>
              )}
            </div>
          );
          day++;
        }
        weeks.push(
          <div key={week} className="grid grid-cols-7">
            {days}
          </div>
        );
      }

      months.push(
        <div key={month} className="border rounded p-2 shadow-md bg-white">
          <h2 className="text-lg font-semibold text-center mb-2">
            {firstDay.toLocaleString("default", { month: "long" })}
          </h2>
          <div className="grid grid-cols-7 text-xs font-bold text-center text-gray-600 border-b pb-1">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          {weeks}
        </div>
      );
    }

    return months;
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {generateMonths()}
      </div>
    </div>
  );
}

export default CalendarView;