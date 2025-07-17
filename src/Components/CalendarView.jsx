import React from "react";
import "./CalendarView.css";

const CalendarView = ({ onDateClick, selectedDate, highlightDates = {} }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeks = [];
  let day = 1 - firstDay;

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      const currentDate = new Date(year, month, day);
      const dateStr = currentDate.toISOString().split("T")[0];
      const isCurrentMonth = day >= 1 && day <= daysInMonth;

      week.push(
        <td key={j} className="border text-center p-2">
          {isCurrentMonth ? (
            <button
              onClick={() => onDateClick && onDateClick(dateStr)}
              className={`w-full rounded ${
                selectedDate === dateStr ? "bg-blue-300" : ""
              } ${
                highlightDates[dateStr] === "full"
                  ? "bg-blue-500 text-white"
                  : highlightDates[dateStr] === "partial"
                  ? "bg-yellow-300"
                  : highlightDates[dateStr] === "empty"
                  ? "bg-green-300"
                  : ""
              }`}
            >
              {day}
            </button>
          ) : (
            ""
          )}
        </td>
      );
      day++;
    }
    weeks.push(<tr key={i}>{week}</tr>);
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Bookings Calendar</h3>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            {dayLabels.map((d) => (
              <th key={d} className="border p-1">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    </div>
  );
};

export default CalendarView;