const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
};


function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = {
        id: Date.now(),
        value: action.payload,
      };

      const cloneTodos = [...state.todos, newTodo];
      localStorage.setItem('todos', JSON.stringify(cloneTodos)); 
      return {
        todos: cloneTodos,
      };
    case "DELETE_TODO":
      const filterTodo = state.todos.filter(
        (item) => item.id !== action.payload
      );
      return {
        todos: filterTodo,
      };
    case "SET_TODOS":
      return {
        todos: action.payload,
      };
    
    case "EDIT_TODO":
      const { id, updatedValue } = action.payload;
      const updatedTodosEdit = state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: updatedValue };
        }
        return todo;
      });
      return {
        todos: updatedTodosEdit,
      };
    case "TOGGLE_COMPLETE":
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return {
        todos: updatedTodos,
      };
    default:
      return state;
  }
}

export function addTodo(input) {
  return {
    type: "ADD_TODO",
    payload: input,
  };
}

export function deleteTodo(id) {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
}

export function setTodos(todos) {
  return {
    type: "SET_TODOS",
    payload: todos,
  };
}

export function toggleComplete(id) {
  return {
    type: "TOGGLE_COMPLETE",
    payload: id,
  };
}

export function editTodoAction(id, updatedValue) {
  return {
    type: "EDIT_TODO",
    payload: {
      id: id,
      updatedValue: updatedValue,
    },
  };
}

export default todoReducer;
