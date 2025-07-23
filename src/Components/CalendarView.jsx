import React, { useState } from 'react';

const CalendarView = ({ bookings = [], onDateClick, showFullYear = false }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const currentYear = new Date().getFullYear();

  const getBookingsForDate = (dateString) => {
    return bookings.filter(
      (booking) => booking.date.split('T')[0] === dateString
    );
  };

  const getColorClass = (count) => {
    if (count >= 60) return 'bg-red-400';
    if (count >= 40) return 'bg-yellow-300';
    if (count > 0) return 'bg-green-300';
    return 'bg-gray-100';
  };

  const renderMonth = (monthIndex) => {
    const firstDay = new Date(currentYear, monthIndex, 1);
    const lastDay = new Date(currentYear, monthIndex + 1, 0);
    const weeks = [];
    let days = [];

    // Fill in empty starting days
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    for (let date = 1; date <= lastDay.getDate(); date++) {
      const dateObj = new Date(currentYear, monthIndex, date);
      const dateString = dateObj.toISOString().split('T')[0];
      const dateBookings = getBookingsForDate(dateString);
      const itemCount = dateBookings.reduce((sum, b) => sum + parseInt(b.items), 0);
      const colorClass = getColorClass(itemCount);
      const isSelected = selectedDate === dateString;

      days.push(
        <td
          key={date}
          className={`border p-2 text-center cursor-pointer rounded ${colorClass} ${
            isSelected ? 'ring-2 ring-black' : ''
          }`}
          onClick={() => {
            setSelectedDate(dateString);
            onDateClick && onDateClick(dateString);
          }}
        >
          <div className="text-sm font-medium">{date}</div>
          <div className="text-xs">{itemCount > 0 ? `${itemCount} items` : ''}</div>
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
      <div key={monthIndex} className="calendar-month m-2">
        <h3 className="text-center font-bold text-lg mb-1">{months[monthIndex]}</h3>
        <table className="w-full text-xs">
          <thead>
            <tr>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                <th key={d} className="font-medium">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>

        {selectedDate &&
          selectedDate.startsWith(`${currentYear}-${String(monthIndex + 1).padStart(2, '0')}`) && (
            <div className="bg-gray-100 p-2 mt-2 rounded">
              <strong>Bookings for {selectedDate}</strong>
              <ul className="list-disc list-inside">
                {getBookingsForDate(selectedDate).map((b, i) => (
                  <li key={i}>
                    {b.name} - {b.email} - {b.timeSlot} - {b.items} items
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  };

  return (
    <div className={`calendar-grid grid ${showFullYear ? 'grid-cols-3 gap-4' : ''}`}>
      {(showFullYear ? months : [months[new Date().getMonth()]]).map((_, i) =>
        showFullYear || i === new Date().getMonth() ? renderMonth(i) : null
      )}
    </div>
  );
};

export default CalendarView;