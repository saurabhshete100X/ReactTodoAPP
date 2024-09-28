import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Filter from "./Filter";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./utils/localStorageHelpers";
import "../styles/TodoApp.css";

const TodoApp = () => {
  const [todos, setTodos] = useState(loadFromLocalStorage() || []);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div
      className="todo-app"
      style={{
        marginTop: "20px",
        transform: "scale(1.2)",
        transformOrigin: "top left",
      }}
    >
      <h1>To-Do List</h1>
      <AddTodo onAdd={addTodo} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;
