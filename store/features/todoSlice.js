import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, { payload: { text, description, category, dueDate } }) => {
      const newTodo = {
        id: Date.now(),
        text,
        description,
        category,
        dueDate,
        isCompleted: false,
      };
      state.todos.push(newTodo);
    },
    removeTodo: (state, action) => {
      const remainingTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      state.todos = remainingTodos;
    },
    toggleTodo: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);

      state.todos[index].isCompleted = !state.todos[index].isCompleted;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
