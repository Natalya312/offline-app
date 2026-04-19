import { useState } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const addEvent = () => {
    if (!title || !city || !date) return;

    setEvents([...events, { title, city, date }]);

    setTitle("");
    setCity("");
    setDate("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: 30,
        borderRadius: 12,
        width: 350,
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center" }}>Offline Friends</h2>

        <input
          placeholder="Событие"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          placeholder="Город"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <button
          onClick={addEvent}
          style={{
            width: "100%",
            padding: 10,
            background: "black",
            color: "white",
            border: "none",
            borderRadius: 6
          }}
        >
          Создать
        </button>

        <div style={{ marginTop: 20 }}>
          {events.map((e, i) => (
            <div key={i} style={{
              padding: 10,
              borderBottom: "1px solid #eee"
            }}>
              <b>{e.title}</b><br />
              {e.city} — {e.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;