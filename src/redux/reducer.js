import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  MARK_COMPLETED,
  MARK_INCOMPLETE,
  FILTER_TODOS,
  MARK_ALL_COMPLETED,
  EDIT_TODO
} from './actionTypes';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
  filter: 'ALL',
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const newTodo = { 
        text: action.payload.text, 
        completed: false,
        createdAt: new Date().toISOString() // Adding createdAt timestamp
      };
      const updatedTodos = [...state.todos, newTodo];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    }

    case REMOVE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo, index) => index !== action.payload.id),
      };
    }

    case MARK_COMPLETED: {
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: true } : todo
        ),
      };
    }

    case MARK_INCOMPLETE: {
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: false } : todo
        ),
      };
    }

    case FILTER_TODOS: {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }

    case MARK_ALL_COMPLETED: {
      return {
        ...state,
        todos: state.todos.map((todo) => ({ ...todo, completed: true })),
      };
    }

    case EDIT_TODO: {
      const { index, text } = action.payload;
      const todos = [...state.todos];
      todos[index].text = text;
      return {
        ...state,
        todos,
      };
    }

    case 'REORDER_TODOS': {
      const { startIndex, endIndex } = action.payload;
      const todos = Array.from(state.todos);
      const [removed] = todos.splice(startIndex, 1);
      todos.splice(endIndex, 0, removed);
      return {
        ...state,
        todos,
      };
    }

    default:
      return state;
  }
};

export default todoReducer;
