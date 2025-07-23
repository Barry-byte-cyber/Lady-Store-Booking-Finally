import React from "react";
import "./CalendarView.css";

const CalendarView = ({ showFullYear = false, onDateClick, bookingDetails = {}, selectedDate }) => {
  const today = new Date();

  const getMonthName = (monthIndex) => {
    return new Date(2023, monthIndex, 1).toLocaleString("default", { month: "long" });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getColorClass = (count) => {
    if (count >= 60) return "bg-red-200";
    if (count >= 30) return "bg-yellow-200";
    if (count > 0) return "bg-green-200";
    return "";
  };

  const renderCalendar = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const rows = [];
    let cells = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<td key={`empty-${i}`} className="border p-2" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = new Date(year, month, day).toISOString().split("T")[0];
      const bookings = bookingDetails[dateKey] || [];
      const itemCount = bookings.reduce((total, b) => total + Number(b.items || 0), 0);
      const colorClass = getColorClass(itemCount);

      cells.push(
        <td
          key={day}
          className={`border p-2 cursor-pointer ${colorClass}`}
          onClick={() => onDateClick && onDateClick(new Date(year, month, day))}
        >
          <div>{day}</div>
          {itemCount > 0 && <div className="text-xs">{itemCount} items</div>}
        </td>
      );

      if ((cells.length + firstDayOfMonth) % 7 === 0 || day === daysInMonth) {
        rows.push(<tr key={day}>{cells}</tr>);
        cells = [];
      }
    }

    return (
      <div key={`${year}-${month}`} className="calendar-container">
        <h3>{getMonthName(month)}</h3>
        <table className="calendar-table">
          <thead>
            <tr>
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <th key={d} className="border p-2">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  return (
    <div className={`grid ${showFullYear ? "grid-cols-3 gap-4" : ""}`}>
      {showFullYear
        ? Array.from({ length: 12 }, (_, i) => renderCalendar(currentYear, i))
        : renderCalendar(currentYear, currentMonth)}
    </div>
  );
};

export default CalendarView;