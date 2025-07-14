import React from "react";
import AdminView from "./Components/AdminView";
import BookingForm from "./Components/BookingForm";

function App() {
  return (
    <div>
      <h1>Lady Pant Store Booking</h1>
      <BookingForm />
      <hr />
      <AdminView />
    </div>
  );
}

export default App;