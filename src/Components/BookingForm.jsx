import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    items: ""
  });

  const [confirmation, setConfirmation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const itemsBookedForDate = existingBookings
      .filter((b) => b.date === formData.date)
      .reduce((sum, b) => sum + Number(b.items), 0);

    if (itemsBookedForDate + Number(formData.items) > 80) {
      alert("Booking failed: Daily item limit (80) exceeded.");
      return;
    }

    const updatedBookings = [...existingBookings, formData];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    console.log("Saved bookings:", localStorage.getItem("bookings"));

    setConfirmation(`Booking confirmed for ${formData.name} on ${formData.date}!`);
    alert(`Booking confirmed for ${formData.name} on ${formData.date}!`);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name: </label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Date: </label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Number of Items: </label>
          <input
            type="number"
            name="items"
            min="1"
            value={formData.items}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;