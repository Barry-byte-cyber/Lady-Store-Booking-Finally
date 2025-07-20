import React from "react";

function CalendarView({ bookings, onDateClick, showFullYear }) {
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const year = today.getFullYear();

  const renderMonth = (month) => {
    const days = daysInMonth(year, month);
    const start = new Date(year, month, 1).getDay();
    const cells = [];

    for (let i = 0; i < start; i++) {
      cells.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= days; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const bookedItems = bookings
        .filter((b) => b.date === dateStr)
        .reduce((sum, b) => sum + parseInt(b.items), 0);

      cells.push(
        <td
          key={day}
          className={bookedItems > 0 ? "booked" : ""}
          onClick={() => onDateClick && onDateClick(dateStr)}
        >
          {day}
        </td>
      );
    }

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(<tr key={i}>{cells.slice(i, i + 7)}</tr>);
    }

    return (
      <table key={month}>
        <thead>
          <tr>
            <th colSpan="7">
              {new Date(year, month).toLocaleString("default", { month: "long" })}
            </th>
          </tr>
          <tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return <div className="calendar-container">{Array.from({ length: showFullYear ? 12 : 1 }, (_, i) => renderMonth(i))}</div>;
}

export default CalendarView;