import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/reducers/todo-reducer";

function InputTodo() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  

  const handleClick = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      setError("Silahkan isi todo anda");
      return;
    }

    dispatch(addTodo(input));
    setInput("");
    setError("");
  }

  return (
    <div className="mb-6">
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green-500 focus:border-green-500"
          placeholder="Tambahkan todo-list anda"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 ml-2"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
      {error && (
        <p className="text-red-600 text-sm font-semibold mt-2">{error}</p>
          )}
    </div>
  );
}

export default InputTodo;
