// store.js
import { createStore } from 'redux';
import todoReducer from './reducer';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch {
    // ignore write errors
  }
};

const persistedState = loadState();

const store = createStore(
  todoReducer,
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;