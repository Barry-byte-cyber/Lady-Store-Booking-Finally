import React, { useState } from "react";
import CalendarView from "./CalendarView";

function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [items, setItems] = useState("");

  const [lookupName, setLookupName] = useState("");
  const [lookupEmail, setLookupEmail] = useState("");
  const [userBookings, setUserBookings] = useState([]);

  const handleBooking = () => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const totalForDate = bookings
      .filter((b) => b.date === date)
      .reduce((sum, b) => sum + parseInt(b.items), 0);

    if (totalForDate + parseInt(items) > 80) {
      alert("Booking exceeds daily 80 item limit");
      return;
    }

    const newBooking = { name, email, date, time, items };
    localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));
    alert("Booking successful");
  };

  const handleLookup = () => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const found = bookings.filter(
      (b) => b.name === lookupName && b.email === lookupEmail
    );
    setUserBookings(found);
  };

  const handleCancel = (index) => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updated = bookings.filter((_, i) => !(i === index));
    localStorage.setItem("bookings", JSON.stringify(updated));
    alert("Booking cancelled");
    setUserBookings([]);
  };

  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  return (
    <div>
      <h1>Lady Pant Store Booking</h1>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <br />
        <label>Time Slot:</label>
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="">Select Time</option>
          <option value="10:30 AM">10:30 AM</option>
          <option value="1:30 PM">1:30 PM</option>
        </select>
        <br />
        <label>Number of Items:</label>
        <input
          type="number"
          value={items}
          onChange={(e) => setItems(e.target.value)}
        />
        <br />
        <button onClick={handleBooking}>Book Now</button>
      </div>

      <h2>Lookup or Cancel Booking</h2>
      <input
        placeholder="Name"
        value={lookupName}
        onChange={(e) => setLookupName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={lookupEmail}
        onChange={(e) => setLookupEmail(e.target.value)}
      />
      <button onClick={handleLookup}>Find My Bookings</button>
      <ul>
        {userBookings.map((b, index) => (
          <li key={index}>
            {b.date} at {b.time} — {b.items} items
            <button onClick={() => handleCancel(index)}>Cancel</button>
          </li>
        ))}
      </ul>

      <CalendarView bookings={bookings} showFullYear={true} />
    </div>
  );
}

export default BookingForm;