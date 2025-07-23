import React, { useState } from 'react';
import './CalendarView.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarView = ({ bookings, onDateClick, showFullYear = false }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const currentYear = new Date().getFullYear();

  const getBookingsForDate = (dateString) => {
    return bookings.filter(
      (booking) => booking.date.split('T')[0] === dateString
    );
  };

  const getColorClass = (count) => {
    if (count >= 60) return 'bg-red';
    if (count >= 40) return 'bg-yellow';
    if (count > 0) return 'bg-green';
    return 'bg-default';
  };

  const renderMonth = (monthIndex) => {
    const firstDay = new Date(currentYear, monthIndex, 1);
    const lastDay = new Date(currentYear, monthIndex + 1, 0);
    const weeks = [];
    let days = [];

    // Fill initial empty days
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    for (let date = 1; date <= lastDay.getDate(); date++) {
      const dateObj = new Date(currentYear, monthIndex, date);
      const dateString = dateObj.toISOString().split('T')[0];
      const dateBookings = getBookingsForDate(dateString);
      const itemCount = dateBookings.reduce((sum, b) => sum + parseInt(b.items), 0);

      const isSelected = selectedDate === dateString;
      days.push(
        <td
          key={date}
          className={`calendar-cell ${getColorClass(itemCount)}`}
          onClick={() => {
            setSelectedDate(dateString);
            onDateClick && onDateClick(dateString);
          }}
        >
          <div className="date-number">{date}</div>
          <div className="item-count">{itemCount > 0 ? `${itemCount}` : ''}</div>
        </td>
      );

      if (days.length === 7) {
        weeks.push(<tr key={`week-${date}`}>{days}</tr>);
        days = [];
      }
    }

    if (days.length > 0) {
      while (days.length < 7) days.push(<td key={`filler-${days.length}`}></td>);
      weeks.push(<tr key="last-week">{days}</tr>);
    }

    return (
      <div key={monthIndex} className="calendar-month">
        <h3>{months[monthIndex]}</h3>
        <table className="calendar-table">
          <thead>
            <tr>
              <th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>
            </tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>

        {selectedDate === `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(
          new Date(selectedDate).getDate()
        ).padStart(2, '0')}` && (
          <div className="dropdown-info">
            <strong>Bookings for {selectedDate}</strong>
            <ul>
              {getBookingsForDate(selectedDate).map((b, i) => (
                <li key={i}>{b.name} - {b.email} - {b.timeSlot} - {b.items} items</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-grid">
      {(showFullYear ? months : [months[new Date().getMonth()]]).map((_, i) =>
        showFullYear || i === new Date().getMonth() ? renderMonth(i) : null
      )}
    </div>
  );
};

export default CalendarView;