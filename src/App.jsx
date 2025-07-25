import './index.css'; 
import React from "react";
import BookingForm from "./Components/BookingForm";
import AdminView from "./Components/AdminView";
import Login from "./Components/Login";
import CalendarView from "./Components/CalendarView";

function App() {
  console.log("Force rebuild");

  const params = new URLSearchParams(window.location.search);
  const isAdmin = params.get("admin") === "true";

  return (
    <div>
<h1 className="text-2xl font-bold text-green-600">Tailwind Test</h1>
      {isAdmin ? (
        sessionStorage.getItem("isAdmin") === "true" ? (
          <AdminView />
        ) : (
          <Login />
        )
      ) : (
        <BookingForm />
      )}
    </div>
  );
}

export default App;