import React from "react";
import BookingForm from "./Components/BookingForm";
import AdminView from "./Components/AdminView";
import Login from "./Components/Login";

function App() {
  console.log("Force rebuild");

  const params = new URLSearchParams(window.location.search);
  const isAdmin = params.get("admin") === "true";

  return (
    <div>
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