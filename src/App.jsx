import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // User profile data
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    date: "",
    interest: "",
  });

  // List of interests (including user-added)
  const [interests, setInterests] = useState([]);

  // Example nearby users (mock data)
  const MOCK_USERS = [
    { id: 1, name: "Alex", activity: "volleyball", time: "now", distance: "300 m" },
    { id: 2, name: " Anna", activity: "beer", time: "in 1 hour", distance: "500 m" },
    { id: 3, name: "Igor", activity: "chess", time: "now", distance: "200 m" },
    { id: 4, name: "Natalia", activity: "walk", time: "evening", distance: "1 km" },
  ];

  // Load saved data on start
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("offline-user"));
    const savedInterests = JSON.parse(localStorage.getItem("offline-interests"));

    if (savedProfile) setProfile(savedProfile);
    if (savedInterests) setInterests(savedInterests);
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Save profile to localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("offline-user", JSON.stringify(profile));
    alert("Profile saved!");
  };

  // Add new interest
  const handleAddInterest = () => {
    if (!profile.interest.trim()) return;

    if (!interests.includes(profile.interest)) {
      const updated = [...interests, profile.interest];
      setInterests(updated);
      localStorage.setItem("offline-interests", JSON.stringify(updated));
    }
  };

  // Filter users by interest
  const matches = profile.interest
    ? MOCK_USERS.filter(
        (user) =>
          user.activity.toLowerCase() === profile.interest.toLowerCase()
      )
    : [];

  return (
    <div
      className="App"
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      <h1>Offline — find people by interest</h1>

      {/* Profile form */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={profile.date}
            onChange={handleChange}
          />
        </label>

        <label>
          Add your interest:
          <input
            type="text"
            name="interest"
            value={profile.interest}
            onChange={handleChange}
            placeholder="Example: volleyball, chess, beer..."
          />
        </label>

        <button type="button" onClick={handleAddInterest}>
          Add interest
        </button>

        <button type="submit">Save profile</button>
      </form>

      {/* Interests list */}
      <h2>My interests:</h2>
      <ul>
        {interests.length === 0 && <p>No interests yet</p>}
        {interests.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* Nearby people */}
      <h2>People nearby with your interest:</h2>
      {matches.length === 0 ? (
        <p>No matches for this activity yet.</p>
      ) : (
        <ul>
          {matches.map((user) => (
            <li key={user.id}>
              {user.name} — {user.time}, {user.distance}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
