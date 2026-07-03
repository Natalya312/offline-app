import React, { useState, useEffect } from "react";

export default function PeopleNearby() {
  const [people, setPeople] = useState([]);
  const [activityFilter, setActivityFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState(10);

  // Temporary mock data — replace later with real data from p2p.js
  const mockPeople = [
    { name: "Anna", activity: "Volleyball", distance: 3 },
    { name: "Markus", activity: "Chess", distance: 8 },
    { name: "Julia", activity: "Beer meetup", distance: 12 },
    { name: "Tom", activity: "Walk", distance: 5 },
  ];

  useEffect(() => {
    const filtered = mockPeople.filter(
      (p) =>
        (!activityFilter || p.activity === activityFilter) &&
        p.distance <= distanceFilter
    );
    setPeople(filtered);
  }, [activityFilter, distanceFilter]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>People Nearby</h1>
      <p>Here you’ll see people within {distanceFilter} km who share your activity.</p>

      {/* Activity filter */}
      <label>
        Activity:
        <select
          value={activityFilter}
          onChange={(e) => setActivityFilter(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">All</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Chess">Chess</option>
          <option value="Beer meetup">Beer meetup</option>
          <option value="Walk">Walk</option>
        </select>
      </label>

      {/* Distance filter */}
      <div style={{ marginTop: "10px" }}>
        <label>
          Distance (km):
          <input
            type="number"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(Number(e.target.value))}
            style={{ width: "60px", marginLeft: "10px" }}
