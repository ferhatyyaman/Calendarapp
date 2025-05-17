import React, { useState } from "react";

const AddTodo = ({ onAdd }) => {
  const [time, setTime] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time || !text) {
      alert("Lütfen saat ve plan girin.");
      return;
    }
    onAdd({ time, text });
    setTime("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Planınızı yazın"
        required
        style={{ marginRight: "0.5rem" }}
      />
      <button type="submit">Ekle</button>
    </form>
  );
};

export default AddTodo;
