// src/App.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from '../src/slices/TodosSlice';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="my-4">ToDo App</h1>
      <div className="row w-100">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a todo"
          />
        </div>
      </div>
      <div className="row w-100 mt-2">
        <div className="col-12 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleAddTodo}>Add Todo</button>
        </div>
      </div>
      <ul className=" mt-3">
        {todos.map((todo) => (
          <li key={todo.id} className="d-flex justify-content-between align-items-center">
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button className="btn btn-danger btn-link btn-sm" onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
