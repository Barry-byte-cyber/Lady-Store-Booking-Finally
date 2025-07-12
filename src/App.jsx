import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Lady Pant Store Booking</h1>
      {!bookingConfirmed ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:{" "}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <button type="submit" style={{ marginLeft: "1rem" }}>
            Book Now
          </button>
        </form>
      ) : (
        <h2>Thank you for booking, {name}!</h2>
      )}
    </div>
  );
}

export default App;