import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminView from "./Components/AdminView";
import BookingForm from "./Components/BookingForm";
import CalendarView from "./Components/CalendarView";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Lady Pant Store Booking</h1>
              <BookingForm />
              <hr />
              <CalendarView />
            </div>
          }
        />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App;