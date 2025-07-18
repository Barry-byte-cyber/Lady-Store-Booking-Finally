import React, { useState, useEffect } from "react";
import bookingform from "./components/bookingform";
import lookup from "./components/lookup";
import calendarview from "./components/calendarview";
import adminview from "./components/adminview";

function App() {
  const [bookings, setBookings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }

    const queryParams = new URLSearchParams(window.location.search);
    const adminParam = queryParams.get("admin");
    setIsAdmin(adminParam === "true");
  }, []);

  const handleBooking = (newBooking) => {
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  const handleCancel = (email, name) => {
    const updatedBookings = bookings.filter(
      (b) => !(b.email === email && b.name === name)
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="container mx-auto p-4">
      {isAdmin ? (
        <AdminView bookings={bookings} />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Lady Pant Store Booking</h1>
          <bookingform onBooking={handleBooking} />
          <lookup bookings={bookings} onCancel={handleCancel} />
          <calendarview bookings={bookings} showFullYear={true} />
        </>
      )}
    </div>
  );
}

export default app;