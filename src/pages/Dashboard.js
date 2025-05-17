import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar/CalendarView";
import AddTodo from "../components/Todo/AddTodo";
import TodoList from "../components/Todo/TodoList";
import { auth } from "../Firabase/config";
import { useNavigate } from "react-router-dom";

import { addTodo, fetchTodos, deleteTodo } from "../Firabase/todo";

import "./Dashboard.css";  // CSS dosyasını import et

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
    <div className="container">
      <header className="header">
        <h1>Takvim Uygulaması</h1>
        <button onClick={handleLogout} className="logoutButton">
          Çıkış Yap
        </button>
      </header>

      <div className="contentWrapper">
        <div className="calendarWrapper">
          <Calendar />
        </div>
        <div className="todoWrapper">
          <AddTodo onAdd={handleAddTodo} />
          <TodoList todos={todos} onDelete={handleDeleteTodo} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
