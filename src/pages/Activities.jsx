import React, { useState } from "react";

export default function Activities() {
  const [selected, setSelected] = useState(null);

  const activities = [
    "Volleyball",
    "Chess",
    "Beer meetup",
    "Walk",
    "Board games",
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Choose Activity</h1>
      <p>Select what you want to do today:</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {activities.map((activity) => (
          <li key={activity} style={{ marginBottom: "10px" }}>
            <button
              onClick={() => setSelected(activity)}
              style={{
                backgroundColor: selected === activity ? "#4CAF50" : "#eee",
                color: selected === activity ? "white" : "black",
                border: "none",
                padding: "10px 15px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {activity}
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <p style={{ marginTop: "20px" }}>
          ✅ You selected: <strong>{selected}</strong>
        </p>
      )}
    </div>
  );
}
