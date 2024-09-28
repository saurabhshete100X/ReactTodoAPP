// src/App.js
import React, { useState, useEffect } from "react";
import TodoList from "./componants/TodoList";
import AddTodo from "./componants/AddTodo";
import Filter from "./componants/Filter";
import "./styles/TodoApp.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch todos from API on initial render
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://dummyjson.com/todos");
        const data = await response.json();
        const formattedTodos = data.todos.map((todo) => ({
          id: todo.id,
          text: todo.todo,
          completed: todo.completed,
        }));
        setTodos(formattedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  // Update local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new todo at the top
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos((prevTodos) => [newTodo, ...prevTodos]); // Add newTodo at the top
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true; // 'all' case
  });

  return (
    <div className="todo-app">
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

export default App;
