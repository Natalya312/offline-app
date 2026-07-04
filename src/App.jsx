import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./pages/Profile";
import Activities from "./pages/Activities";
import PeopleNearby from "./pages/PeopleNearby";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Profile</Link>
        <Link to="/activities" style={{ marginRight: "10px" }}>Activities</Link>
        <Link to="/nearby">People Nearby</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/nearby" element={<PeopleNearby />} />
      </Routes>
    </div>
  );
}
