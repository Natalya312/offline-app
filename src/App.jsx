import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    date: "",
    interest: "",
  });

  const [interests, setInterests] = useState([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [distance, setDistance] = useState("");

  const MOCK_USERS = [
    { id: 1, name: "Alex", activity: "volleyball", time: "now", distance: 0.3, gender: "male", age: "25" },
    { id: 2, name: "Anna", activity: "beer", time: "in 1 hour", distance: 0.5, gender: "female", age: "30" },
    { id: 3, name: "Igor", activity: "chess", time: "now", distance: 0.2, gender: "male", age: "35" },
    { id: 4, name: "Natalia", activity: "walk", time: "evening", distance: 1, gender: "female", age: "38" },
  ];

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("offline-user"));
    const savedInterests = JSON.parse(localStorage.getItem("offline-interests"));

    if (savedProfile) setProfile(savedProfile);
    if (savedInterests) setInterests(savedInterests);
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullProfile = {
      ...profile,
      age,
      gender,
      meetingTime,
      meetingDate,
      distance,
    };

    localStorage.setItem("offline-user", JSON.stringify(fullProfile));
    alert("Profile saved!");
  };

  const handleAddInterest = () => {
    if (!profile.interest.trim()) return;

    if (!interests.includes(profile.interest)) {
      const updated = [...interests, profile.interest];
      setInterests(updated);
      localStorage.setItem("offline-interests", JSON.stringify(updated));
    }
  };

  const matches = profile.interest
    ? MOCK_USERS.filter(
        (user) =>
          user.activity.toLowerCase() === profile.interest.toLowerCase() &&
          (!distance || user.distance <= Number(distance)) &&
          (!gender || user.gender === gender) &&
          (!age || user.age === age)
      )
    : [];

  return (
    <div className="App" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Offline — find people by interest</h1>

      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
        <input type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
        <input type="number" placeholder="Distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} />

        <label>
          Name:
          <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Enter your name" />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Enter your email" />
        </label>

        <label>
          Date:
          <input type="date" name="date" value={profile.date} onChange={handleChange} />
        </label>

        <label>
          Add your interest:
          <input type="text" name="interest" value={profile.interest} onChange={handleChange} placeholder="Example: volleyball, chess, beer..." />
        </label>

        <button type="button" onClick={handleAddInterest}>Add interest</button>
        <button type="submit">Save profile</button>
      </form>

      <h2>My interests:</h2>
      <ul>
        {interests.length === 0 && <p>No interests yet</p>}
        {interests.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>People nearby with your interest:</h2>
      {matches.length === 0 ? (
        <p>No matches for this activity yet.</p>
      ) : (
        <ul>
          {matches.map((user) => (
            <li key={user.id}>
              {user.name} — {user.time}, {user.distance} km
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
