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
    <form
  onSubmit={handleSubmit}
  style={{
    marginBottom: "1rem",
    marginTop:"20px",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  }}
>
  <input
    type="time"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    required
    style={{
      flex: "1 1 120px",
      minWidth: "120px",
      padding: "0.5rem",
      fontSize: "1rem",
    }}
  />
  <input
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Planınızı yazın"
    required
    style={{
      flex: "2 1 200px",
      minWidth: "200px",
      padding: "0.5rem",
      fontSize: "1rem",
    }}
  />
  <button
    type="submit"
    style={{
      flex: "0 1 100px",
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      cursor: "pointer",
    }}
  >
    Ekle
  </button>
</form>

  );
};

export default AddTodo;
