import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  setTodos,
  toggleComplete,
  editTodoAction
} from "../redux/reducers/todo-reducer";

function TodoList() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);
  const [filter, setFilter] = useState("all");
  const [updatedValue, setUpdatedValue] = useState("");
  const [editId, setEditId] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    const updateTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  };

  const handleEdit = (id, updatedValue) => {
    const editedTodo = todos.find((todo) => todo.id === id);
    if (editedTodo) {
      setUpdatedValue(editedTodo.value); // Mengisi nilai input dengan nilai todo yang ada
      setEditId(id); // Mengatur mode edit aktif
    }
  };

  const handleSaveEdit = (id) => {
    if (updatedValue !== "") {
      dispatch(editTodoAction(id, updatedValue));
      setEditId(null); // Menonaktifkan mode edit

      // Perbarui `localStorage` setelah menyimpan perubahan
      const updatedTodosInStorage = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: updatedValue };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodosInStorage));
    } else {
      // Tangani kasus ketika nilai yang diedit kosong
      alert("Nilai yang diedit tidak boleh kosong.");
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      dispatch(setTodos(savedTodos));
    }
    console.log(savedTodos);

    if (todos) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-center mb-4 rounded-md shadow-sm" role="group">
      <button
            className={`px-4 py-2 m-5 text-sm font-medium text-gray-900 bg-transparent border border-green-400 rounded-lg hover:bg-green-400 hover:text-white focus:z-10 focus:bg-green-500 focus:text-white ${
              filter === "all" ? "hover:bg-green-500 hover:text-white" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className="px-4 py-2 m-5 text-sm font-medium text-gray-900 bg-transparent border border-green-400 rounded-lg hover:bg-green-400 hover:text-white focus:z-10  focus:bg-green-500 focus:text-white"
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className="px-4 py-2 m-5 text-sm font-medium text-gray-900 bg-transparent border border-green-400 rounded-lg hover:bg-green-400 hover:text-white focus:z-10  focus:bg-green-500 focus:text-white"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
      </div>
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleComplete(todo.id)}
          />
          {editId === todo.id ? (
            <input
              type="text"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
          ) : (
            <span className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {todo.value}
            </span>
          )}
          {editId === todo.id ? (
            <button className="ml-auto px-6 py-4 text-right">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => handleSaveEdit(todo.id)}
              >
                Save
              </a>
            </button>
          ) : (
            <button className="ml-auto px-6 py-4 text-right">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => handleEdit(todo.id, updatedValue)}
              >
                ✏️
              </a>
            </button>
          )}
          <button className="ml-2 px-6 py-4 text-right" onClick={() => handleDelete(todo.id)}>
            <a
              href="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              ❌
            </a>
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
