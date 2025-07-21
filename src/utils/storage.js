export const getBookings = () => {
  const data = localStorage.getItem("bookings");
  return data ? JSON.parse(data) : [];
};

export const saveBooking = (booking) => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
};