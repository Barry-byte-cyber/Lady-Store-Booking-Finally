import { useState } from 'react';

function BookingForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setMessage(`Thanks for booking, ${name}!`);
    setName('');
  };

  return (
    <div>
      <h1>Lady Pant Store Booking</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Book Now</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BookingForm;