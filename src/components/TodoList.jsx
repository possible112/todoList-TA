import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../redux/reducers/todo-reducer";

function TodoList() {
  const dispatch = useDispatch()
  const { todos } = useSelector((state) => state.todo);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  return (
    
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center justify-between bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <span className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{todo.value}</span>
          <button className="ml-auto px-6 py-4 text-right">
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">✏️</a>
          </button>
          <button className="ml-2 px-6 py-4 text-right" onClick={() => handleDelete(todo.id)}>
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">❌</a>
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;