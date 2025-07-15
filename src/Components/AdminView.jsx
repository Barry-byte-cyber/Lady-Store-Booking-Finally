import React from "react";

const AdminView = () => {
  const isAdmin = new URLSearchParams(window.location.search).get("admin") === "true";

  if (!isAdmin) {
    return <p style={{ padding: "1rem" }}>Access Denied. Admins only.</p>;
  }

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin View – All Bookings</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Time</th>
            <th className="border px-2 py-1">Items</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{b.name}</td>
              <td className="border px-2 py-1">{b.email}</td>
              <td className="border px-2 py-1">{b.date}</td>
              <td className="border px-2 py-1">{b.time}</td>
              <td className="border px-2 py-1">{b.items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminView;