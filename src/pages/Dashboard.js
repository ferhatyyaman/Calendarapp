import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar/CalendarView";
import AddTodo from "../components/Todo/AddTodo";
import TodoList from "../components/Todo/TodoList";
import { auth } from "../Firabase/config";
import { useNavigate } from "react-router-dom";

import { addTodo, fetchTodos, deleteTodo } from "../Firabase/todo";

function Dashboard() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  const handleAddTodo = async (todo) => {
    try {
      const id = await addTodo({ ...todo, createdAt: new Date().toISOString() });
      setTodos([...todos, { ...todo, id }]);
    } catch (error) {
      alert("Plan eklenirken hata oluştu.");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      alert("Plan silinirken hata oluştu.");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Takvim Uygulaması</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Çıkış Yap
        </button>
      </header>

      <div style={styles.contentWrapper}>
        <div style={styles.calendarWrapper}>
          <Calendar />
        </div>
        <div style={styles.todoWrapper}>
          <AddTodo onAdd={handleAddTodo} />
          <TodoList todos={todos} onDelete={handleDeleteTodo} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

const styles = {
  container: {
    padding: "2rem",
  },
  header: {
    marginBottom: "1rem",
    borderBottom: "1px solid #ccc",
    paddingBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",  // dikey ortalama için
  },
  contentWrapper: {
    display: "flex",
    padding: "2rem",
    gap: "2rem",
    flexWrap: "wrap",
  },
  calendarWrapper: {
    flex: 4,
    minWidth: "300px",
  },
  todoWrapper: {
    flex: 1,
    minWidth: "250px",
  },
  logoutButton: {
    marginBottom: "0",
  },
};