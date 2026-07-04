import React, { useState, useEffect } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    city: "",
    language: "en",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={profile.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={profile.age}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="city"
          placeholder="City"
          value={profile.city}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select
          name="language"
          value={profile.language}
          onChange={handleChange}
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>

        <br /><br />

        <button type="submit">Save Profile</button>
      </form>

      {profile.name && (
        <div style={{ marginTop: "20px" }}>
          <h3>Preview</h3>
          <p>👤 {profile.name}, {profile.age}</p>
          <p>📍 {profile.city}</p>
          <p>🌍 {profile.language}</p>
        </div>
      )}
    </div>
  );
}
