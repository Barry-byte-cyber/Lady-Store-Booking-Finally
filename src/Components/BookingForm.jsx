import React, { useState } from "react";

const [confirmation, setConfirmation] = useState('');

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

  // Get existing bookings or initialize empty array
  const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  // Calculate total items already booked for the selected date
  const itemsBookedForDate = existingBookings
    .filter((b) => b.date === formData.date)
    .reduce((sum, b) => sum + Number(b.items), 0);

  // Check if booking exceeds limit
  if (itemsBookedForDate + Number(formData.items) > 80) {
    alert("Booking failed: Daily item limit (80) exceeded.");
    return;
  }

  // Save booking to localStorage
  const updatedBookings = [...existingBookings, formData];
  localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  console.log("Saved bookings:", localStorage.getItem("bookings"));
  alert(`Booking confirmed for ${formData.name} on ${formData.date}!`);
};
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