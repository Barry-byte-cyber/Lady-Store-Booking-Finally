import React from "react";
import BookingForm from "./components/BookingForm";
import AdminView from "./components/AdminView";
import Login from "./components/Login";

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