import InputTodo from "./components/InputTodo"
import TodoList from "./components/TodoList"

function App() {

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold text-green-500 mb-4">Todo List Andiagung</h1>
        <InputTodo />
        <TodoList />
      </div>
      
    </>
  )
}

export default App