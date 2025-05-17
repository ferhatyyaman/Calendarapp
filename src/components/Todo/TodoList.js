import React from "react";

const TodoList = ({ todos, onDelete }) => {
  if (todos.length === 0) return <p>Henüz plan eklenmedi.</p>;

  return (
    <div>
      {todos.map(({ id, time, text }) => (
        <div
          key={id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            border: "1px solid #ccc",
            padding: "0.5rem",
            borderRadius: "4px",
          }}
        >
          <div>
            <strong>{time}</strong> - {text}
          </div>
          <button onClick={() => onDelete(id)}>Sil</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
