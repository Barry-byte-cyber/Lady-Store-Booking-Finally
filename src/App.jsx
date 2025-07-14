import React from "react";
import AdminView from "./Components/AdminView";
import BookingForm from "./Components/BookingForm";
import CalendarView from "./Components/CalendarView";

function App() {
  return (
    <div>
      <h1>Lady Pant Store Booking</h1>
      <BookingForm />
      <hr />
      <CalendarView />
      <AdminView />
    </div>
  );
}

export default App;