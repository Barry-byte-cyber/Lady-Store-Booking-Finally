import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminView from "./Components/AdminView";
import BookingForm from "./Components/BookingForm";
import CalendarView from "./Components/CalendarView";
import Login from "./Components/Login"; // Now wired in properly

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

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
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminView /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;