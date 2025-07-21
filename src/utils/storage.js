export function getBookings() {
  const bookingsJSON = localStorage.getItem("bookings");
  try {
    return bookingsJSON ? JSON.parse(bookingsJSON) : [];
  } catch {
    return [];
  }
}