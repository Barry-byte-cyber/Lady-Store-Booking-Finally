import React from 'react';

function CalendarView({ onDateClick, bookingDetails = {}, selectedDate = null, showFullYear = false }) {
  const today = new Date();

  const renderMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const rows = [];
    let cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split("T")[0];
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const bookingCount = bookingDetails[dateStr]?.length || 0;

      cells.push(
        <td
          key={dateStr}
          style={{
            border: '1px solid #ccc',
            padding: '5px',
            backgroundColor: isSelected ? '#add8e6' : '',
            cursor: 'pointer',
            textAlign: 'center'
          }}
          onClick={() => onDateClick && onDateClick(date)}
        >
          {day}
          {bookingCount > 0 && <div style={{ fontSize: '12px', color: 'red' }}>★</div>}
        </td>
      );

      if ((cells.length % 7 === 0) || (day === daysInMonth)) {
        rows.push(<tr key={`row-${day}`}>{cells}</tr>);
        cells = [];
      }
    }

    return (
      <div key={month} style={{ margin: '10px', width: '250px' }}>
        <h4 style={{ textAlign: 'center' }}>{new Date(year, month).toLocaleString('default', { month: 'long' })}</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <th key={d} style={{ border: '1px solid #ccc', backgroundColor: '#f0f0f0' }}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };

  const currentYear = today.getFullYear();
  const months = showFullYear ? Array.from({ length: 12 }, (_, i) => i) : [today.getMonth()];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {months.map((month) => renderMonth(currentYear, month))}
    </div>
  );
}

export default CalendarView;