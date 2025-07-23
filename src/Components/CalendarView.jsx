import React from "react";

function CalendarView({ onDateClick, showFullYear = false, bookingDetails = {}, selectedDate }) {
  const today = new Date();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderMonth = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }

    return (
      <div key={`${year}-${month}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
        <h3 className="text-center font-bold mb-2">
          {new Date(year, month).toLocaleString("default", { month: "long" })}
        </h3>
        <div className="grid grid-cols-7 gap-1 text-center border">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d} className="font-bold">
              {d}
            </div>
          ))}
          {days.map((date, idx) => {
            const day = date?.getDate();
            const dateKey = date?.toISOString().split("T")[0];
            const bookingCount = bookingDetails[dateKey]?.reduce((acc, b) => acc + Number(b.items), 0) || 0;

            let bgColor = "bg-white";
            if (bookingCount >= 80) bgColor = "bg-blue-300";
            else if (bookingCount >= 40) bgColor = "bg-yellow-300";
            else if (bookingCount > 0) bgColor = "bg-green-200";

            const isSelected = date && selectedDate && date.toDateString() === selectedDate.toDateString();

            return (
              <div
                key={idx}
                className={`h-16 flex flex-col items-center justify-center border cursor-pointer ${bgColor} ${
                  isSelected ? "ring-2 ring-black" : ""
                }`}
                onClick={() => date && onDateClick && onDateClick(date)}
              >
                <div>{day || ""}</div>
                {bookingCount > 0 && (
                  <div className="text-xs font-semibold">{bookingCount} items</div>
                )}
              </div>
            );
          })}
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