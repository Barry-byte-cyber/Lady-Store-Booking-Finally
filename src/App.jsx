import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminView from "./Components/AdminView";
import BookingForm from "./Components/BookingForm";
import CalendarView from "./Components/CalendarView";
import Login from "./Components/Login"; // Add this import

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          element={
            isAuthenticated ? (
              <AdminView />
            ) : (
              <Login onAuthSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;