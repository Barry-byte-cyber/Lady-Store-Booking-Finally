import React from "react";

const CalendarView = ({ onDateClick }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed
  const currentDate = today.getDate();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0=Sun, 1=Mon...
  const calendar = [];

  // Start with empty cells if the month doesn't start on Monday
  const offset = (firstDay + 6) % 7;
  for (let i = 0; i < offset; i++) {
    calendar.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendar.push(i);
  }

  const weeks = [];
  for (let i = 0; i < calendar.length; i += 7) {
    weeks.push(calendar.slice(i, i + 7));
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bookings Calendar</h2>
      <table>
        <thead>
          <tr>
            <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((date, di) => (
                <td key={di} style={{ padding: "6px" }}>
                  {date ? (
                    <button
                      onClick={() => onDateClick && onDateClick(date)}
                      style={{
                        border: "1px solid gray",
                        padding: "4px 8px",
                        cursor: "pointer",
                        backgroundColor:
                          date === currentDate ? "#add8e6" : "white",
                      }}
                    >
                      {date}
                    </button>
                  ) : (
                    <div style={{ width: "32px", height: "32px" }} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarView;