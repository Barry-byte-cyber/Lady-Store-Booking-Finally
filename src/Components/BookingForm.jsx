import React, { useState } from "react";

const BookingForm = () => {
  const [nameQuery, setNameQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [matchedBookings, setMatchedBookings] = useState([]);

const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    items: "",
  });

  const [confirmation, setConfirmation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      ...formData,
      items: parseInt(formData.items, 10),
      timestamp: new Date().toISOString(),
    };

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const dateTotal = bookings
      .filter((b) => b.date === formData.date)
      .reduce((sum, b) => sum + (parseInt(b.items, 10) || 0), 0);

    if (dateTotal + newBooking.items > 80) {
      alert("Booking failed: Daily item limit of 80 exceeded.");
      return;
    }

    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    setConfirmation(
      `Booking confirmed for ${formData.name} on ${formData.date} at ${formData.time} for ${formData.items} items.`
    );
    setFormData({
      name: "",
      email: "",
      date: "",
      time: "",
      items: "",
    });
  };

  return (
    <div>
      <h2>Lady Pant Store Booking</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Date:</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Time Slot:</label>
          <select name="time" value={formData.time} onChange={handleChange} required>
            <option value="">Select Time</option>
            <option value="10:30 AM">10:30 AM</option>
            <option value="11:30 AM">11:30 AM</option>
            <option value="12:30 PM">12:30 PM</option>
            <option value="1:30 PM">1:30 PM</option>
            <option value="2:30 PM">2:30 PM</option>
            <option value="3:30 PM">3:30 PM</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Number of Items:</label>
          <input
            name="items"
            type="number"
            value={formData.items}
            onChange={handleChange}
            required
            min="1"
            max="80"
          />
        </div>

        <button type="submit">Book Now</button>
      </form>

       <h2>Lookup or Cancel Booking</h2>
<input
  type="text"
  placeholder="Name"
  value={nameQuery}
  onChange={(e) => setNameQuery(e.target.value)}
/>
<input
  type="email"
  placeholder="Email"
  value={emailQuery}
  onChange={(e) => setEmailQuery(e.target.value)}
/>
<button onClick={handleLookup}>Find My Bookings</button>

{matchedBookings.length > 0 && (
  <ul>
    {matchedBookings.map((booking, index) => (
      <li key={index}>
        {booking.date} at {booking.time} – {booking.items} item(s)
        <button onClick={() => handleCancel(booking)}>Cancel</button>
      </li>
    ))}
  </ul>
)}
      {confirmation && (
        <div style={{ marginTop: "1rem", color: "green" }}>{confirmation}</div>
      )}
    </div>
  );
};

export default BookingForm;