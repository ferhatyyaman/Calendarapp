import React, { useEffect, useState } from "react";
import Header from "../components/Header/header";
import AddTodo from "../components/Todo/AddTodo";
import TodoList from "../components/Todo/TodoList";
import { fetchTodos, addTodo, deleteTodo } from "../Firabase/todo";

function DailyPlans() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const fetched = await fetchTodos();
      setTodos(fetched);
    };
    loadTodos();
  }, []);

  const handleAdd = async (todo) => {
    const id = await addTodo({ ...todo, createdAt: new Date().toISOString() });
    setTodos([...todos, { ...todo, id }]);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <h2>Günlük Planlar</h2>
      <AddTodo onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
}

export default DailyPlans;
