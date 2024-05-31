

import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../src/slices/TodosSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
