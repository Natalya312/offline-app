import React, { useState, useEffect } from "react";

export default function Activities() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");

    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createEvent = (e) => {
    e.preventDefault();

    const event = {
      id: Date.now(),
      ...newEvent,
      participants: [],
    };

    saveEvents([...events, event]);

    setNewEvent({
      title: "",
      date: "",
      location: "",
      description: "",
    });
  };

  const confirmParticipation = (eventId) => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (!profile || !profile.name) {
      alert("Please create profile first");
      return;
    }

    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        const alreadyJoined = event.participants.includes(profile.name);

        if (alreadyJoined) {
          return event;
        }

        return {
          ...event,
          participants: [...event.participants, profile.name],
        };
      }

      return event;
    });

    saveEvents(updatedEvents);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Events</h1>

      <form onSubmit={createEvent}>
        <input
          name="title"
          placeholder="Event title"
          value={newEvent.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="date"
          type="datetime-local"
          value={newEvent.date}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={newEvent.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Create Event</button>
      </form>

      <hr />

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>{event.title}</h3>
          <p>📅 {event.date}</p>
          <p>📍 {event.location}</p>
          <p>{event.description}</p>

          <button onClick={() => confirmParticipation(event.id)}>
            I’m going
          </button>

          <h4>Confirmed:</h4>

          {event.participants.length === 0 ? (
            <p>No participants yet</p>
          ) : (
            <ul>
              {event.participants.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
