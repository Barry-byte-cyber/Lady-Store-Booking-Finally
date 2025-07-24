import React from "react";

const CalendarView = ({ bookings = [], onDateClick, showFullYear = false }) => {
  const currentYear = new Date().getFullYear();

  const generateCalendar = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];

    const firstDayIndex = date.getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null); // Empty cells before 1st of month
    }

    for (let day = 1; day <= lastDay; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getBookingCount = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    const booking = bookings.find((b) => b.date === dateStr);
    return booking ? booking.items : 0;
  };

  const renderMonth = (monthIndex) => {
    const monthName = new Date(currentYear, monthIndex).toLocaleString("default", { month: "long" });
    const days = generateCalendar(currentYear, monthIndex);

    return (
      <div key={monthIndex} className="p-2">
        <h3 className="text-lg font-semibold mb-2">{monthName}</h3>
        <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center mt-1">
          {days.map((date, idx) => {
            if (!date) {
              return <div key={idx} />;
            }

            const bookingCount = getBookingCount(date);
            const isFullyBooked = bookingCount >= 80;

            return (
              <div
                key={idx}
                className={`border rounded-lg p-1 cursor-pointer text-xs ${
                  isFullyBooked ? "bg-green-300" : "bg-blue-200"
                }`}
                onClick={() => onDateClick && onDateClick(date)}
              >
                <div>{date.getDate()}</div>
                {bookingCount > 0 && <div className="text-[10px]">{bookingCount}</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {(showFullYear ? Array.from({ length: 12 }, (_, i) => i) : [new Date().getMonth()]).map(renderMonth)}
    </div>
  );
};

export default CalendarView;