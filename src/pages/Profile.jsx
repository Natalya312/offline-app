import React, { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    activity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile saved:", profile);
    alert("Profile saved successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Profile</h1>
      <p>Fill in your name, age, and preferred activity.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              style={{ marginLeft: "10px", width: "60px" }}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Preferred Activity:
            <input
              type="text"
              name="activity"
              value={profile.activity}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
              required
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save Profile
        </button>
      </form>

      {profile.name && (
        <div style={{ marginTop: "20px" }}>
          <h3>Preview:</h3>
          <p>
            👤 {profile.name}, {profile.age} years old — loves {profile.activity}.
          </p>
        </div>
      )}
    </div>
  );
}
