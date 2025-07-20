import React from "react";

const BookingCalendar = () => {
  const calendarStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "10px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  };

  const cellStyle = {
    border: "1px solid #ccc",
    padding: "5px",
  };

  const bookedStyle = {
    backgroundColor: "#ffdddd",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div style={calendarStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>July 21</td>
            <td style={{ ...cellStyle, ...bookedStyle }}>Booked</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingCalendar;