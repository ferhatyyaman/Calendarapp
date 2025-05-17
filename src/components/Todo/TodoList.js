import React from "react";

const TodoList = ({ todos, onDelete }) => {
  if (todos.length === 0) return <p>Henüz plan eklenmedi.</p>;

  return (
    <div>
    {todos.length === 0 ? (
      <p>Henüz plan eklenmedi.</p>
    ) : (
      todos.map(({ id, time, text }) => (
        <div
          key={id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            border: "1px solid #ccc",
            padding: "0.5rem",
            borderRadius: "4px",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1 1 70%" }}>
            <strong>{time}</strong> - {text}
          </div>
          <button
            onClick={() => onDelete(id)}
            style={{
              flex: "0 1 25%",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#e74c3c",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Sil
          </button>
        </div>
      ))
    )}
  </div>
  );
};

export default TodoList;
