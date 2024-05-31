// src/features/todos/todosSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for JSON Server
const apiUrl = 'https://react-test-k56k.onrender.com/todos';

// Async thunks for API calls
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
  const response = await axios.post(apiUrl, { text, completed: false });
  return response.data;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id) => {
  const todo = (await axios.get(`${apiUrl}/${id}`)).data;
  const response = await axios.patch(`${apiUrl}/${id}`, { completed: !todo.completed });
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => action.payload)
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
