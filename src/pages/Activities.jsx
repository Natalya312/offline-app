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
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  function saveEvents(updatedEvents) {
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  }

  function handleChange(e) {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  }

  function createEvent(e) {
    e.preventDefault();

    const event = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      location: newEvent.location,
      description: newEvent.description,
      participants: [],
    };

    saveEvents([...events, event]);

    setNewEvent({
      title: "",
      date: "",
      location: "",
      description: "",
    });
  }

  function joinEvent(eventId) {
   const profile = JSON.parse(
  localStorage.getItem("offline_profile")
);
    if (!profile || !profile.name) {
      alert("Create profile first");
      return;
    }

    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        if (event.participants.includes(profile.name)) return event;

        return {
          ...event,
          participants: [...event.participants, profile.name],
        };
      }

      return event;
    });

    saveEvents(updatedEvents);
  }

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
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.date}</p>
          <p>{event.location}</p>
          <p>{event.description}</p>

          <button onClick={() => joinEvent(event.id)}>
            I’m going
          </button>

          <p>Participants:</p>

          {event.participants.length === 0 ? (
            <p>No participants yet</p>
          ) : (
            <ul>
              {event.participants.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}
