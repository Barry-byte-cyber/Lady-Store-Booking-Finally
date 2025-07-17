import React, { useState, useEffect } from "react";
import BookingForm from "./Components/BookingForm";
import Lookup from "./Components/Lookup";
import CalendarView from "./Components/CalendarView";
import AdminView from "./Components/AdminView";

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
          <BookingForm onBooking={handleBooking} />
          <Lookup bookings={bookings} onCancel={handleCancel} />
          <CalendarView bookings={bookings} showFullYear={true} />
        </>
      )}
    </div>
  );
}

export default App;