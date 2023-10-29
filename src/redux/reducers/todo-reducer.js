const initialState = {
  todos: [
  ],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = {
        id: Date.now(),
        value: action.payload,
      };

      const cloneTodos = [...state.todos, newTodo];

      return {
        todos: cloneTodos,
      };
    case "DELETE_TODO":
      const filterTodo = state.todos.filter(
        (item) => item.id != action.payload
      );
      return {
        todos: filterTodo,
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

export default todoReducer;

