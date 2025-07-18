// Force Vercel redeploy — July 18

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./components/CalendarView.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);