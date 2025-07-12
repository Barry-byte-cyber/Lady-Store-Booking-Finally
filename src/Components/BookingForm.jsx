import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    items: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${formData.name} on ${formData.date}!`);
    // Later we'll add backend/API handling here
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Lady Pant Store Booking</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name: </label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Email: </label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Date: </label>
          <input name="date" type="date" value={formData.date} onChange={handleChange} />
        </div>
<div style={{ marginBottom: "1rem" }}>
  <label>Number of Items:</label>
  <input
    name="items"
    type="number"
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