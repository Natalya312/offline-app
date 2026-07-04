import React, { useState, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load messages from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("offline-chat");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("offline-chat", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: input,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Offline Chat</h1>

      {/* Messages list */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "20px",
          background: "#fafafa",
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet...</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                padding: "8px",
                marginBottom: "8px",
                background: "#e6f7ff",
                borderRadius: "6px",
              }}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* Input + button */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
