import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editTodo,
  removeTodo,
  toggleTodo,
  markCompleted,
  markIncomplete,
} from "../redux/actions";
import {
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const TodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editTodo(index, editedText));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString(); // Format date and time
  };

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
      <div className="flex items-center">
        <span className="mr-4 text-gray-500 dark:text-white">{index + 1}.</span>
        <div className="flex flex-col">
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={handleChange}
              autoFocus
              className="mr-4 focus:outline-none focus:border-blue-500 border-b border-transparent dark:bg-slate-700 dark:text-white"
            />
          ) : (
            <span
              className={`mr-4 ${
                todo.completed
                  ? "line-through text-gray-500"
                  : "dark:text-white"
              }`}
            >
              {todo.text}
            </span>
          )}
          <span className="text-xs text-gray-400">
            {formatDate(todo.createdAt)}
          </span>{" "}
          {/* Display creation date */}
        </div>
      </div>
      <div className="space-x-3 ml-8">
        <button
          className="mr-2 text-sm bg-blue-500 dark:bg-blue-900 text-white sm:px-2 px-1 py-1 rounded"
          onClick={isEditing ? handleSave : handleEdit}
        >
          {isEditing ? "Save" : <FiEdit />}
        </button>
        <button
          className="mr-2 text-sm bg-red-500 dark:bg-red-900 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => dispatch(removeTodo(index))}
        >
          <FaTrash />
        </button>
        <button
          className="mr-2 text-sm bg-blue-500 dark:bg-blue-900 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => dispatch(toggleTodo(index))}
        >
          {todo.completed ? <FaToggleOff /> : <FaToggleOn />}
        </button>
        {!todo.completed && (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markCompleted(index))}
          >
            <FaCheck />
          </button>
        )}
        {todo.completed && (
          <button
            className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markIncomplete(index))}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
