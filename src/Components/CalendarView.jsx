import React from "react";

const CalendarView = ({ bookings = {}, onDateClick }) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const generateCalendar = (year) => {
    const months = [];

    for (let month = 0; month < 12; month++) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const days = [];

      for (let i = 0; i < firstDay.getDay(); i++) {
        days.push(null);
      }

      for (let day = 1; day <= lastDay.getDate(); day++) {
        days.push(new Date(year, month, day));
      }

      months.push({ name: monthNames[month], days });
    }

    return months;
  };

  const currentYear = new Date().getFullYear();
  const months = generateCalendar(currentYear);

  const handleClick = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    if (onDateClick) {
      onDateClick(dateStr);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {months.map((month, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h3 style={{ textAlign: "center" }}>{month.name}</h3>
          <table style={{ width: "100%", textAlign: "center", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(month.days.length / 7) }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {month.days.slice(rowIdx * 7, rowIdx * 7 + 7).map((date, cellIdx) => {
                    if (!date) {
                      return <td key={cellIdx}></td>;
                    }
                    const dateStr = date.toISOString().split("T")[0];
                    const isBooked = bookings[dateStr];
                    return (
                      <td
                        key={cellIdx}
                        onClick={() => handleClick(date)}
                        style={{
                          padding: "5px",
                          border: "1px solid #eee",
                          backgroundColor: isBooked ? "#fdd" : "#fff",
                          cursor: "pointer",
                          fontWeight: isBooked ? "bold" : "normal",
                        }}
                      >
                        {date.getDate()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CalendarView;