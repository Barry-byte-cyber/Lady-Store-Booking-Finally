import React, { useState } from "react";

function Login() {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "admin123") {
      sessionStorage.setItem("isAdmin", "true");
      window.location.reload();
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;