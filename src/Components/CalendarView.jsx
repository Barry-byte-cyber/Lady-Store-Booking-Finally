import React from 'react';

function CalendarView({
  onDateClick,
  showFullYear = false,
  bookings = {},
  selectedDate = null,
}) {
  const today = new Date();
  const year = today.getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(year, i);
    return {
      name: date.toLocaleString('default', { month: 'long' }),
      index: i,
    };
  });

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const getStartDay = (month, year) =>
    new Date(year, month, 1).getDay(); // Sunday = 0

  const formatDate = (y, m, d) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const getColorClass = (count) => {
    if (count >= 80) return 'bg-red-500 text-white';
    if (count >= 40) return 'bg-yellow-400';
    if (count > 0) return 'bg-green-400';
    return '';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {months.map((month) => {
        const daysInMonth = getDaysInMonth(month.index, year);
        const startDay = getStartDay(month.index, year);

        return (
          <div key={month.name} className="border rounded-lg shadow-md p-2 bg-white">
            <h3 className="text-center font-semibold text-lg mb-2">
              {month.name} {year}
            </h3>
            <div className="grid grid-cols-7 gap-1 text-center font-semibold">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-1 text-center">
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`blank-${i}`}></div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                const day = dayIndex + 1;
                const dateStr = formatDate(year, month.index, day);
                const itemCount = bookings[dateStr] || 0;

                return (
                  <div
                    key={day}
                    onClick={() => onDateClick && onDateClick(dateStr)}
                    className={`cursor-pointer border rounded-md h-16 flex flex-col items-center justify-center ${getColorClass(
                      itemCount
                    )} ${selectedDate === dateStr ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className="text-sm font-medium">{day}</div>
                    {itemCount > 0 && (
                      <div className="text-xs font-semibold">
                        {itemCount}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarView;