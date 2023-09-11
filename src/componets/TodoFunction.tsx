import React, { useState } from "react";
import "../TodoFunction.css";

interface Todo {
  id: number;
  title: string;
  createdAt: Date;
  completed: boolean;
}

const TodoFunction: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [filter, setFilter] = useState<"uncompleted" | "completed">(
    "uncompleted"
  );

  // Todoを追加する処理
  const addTodo = () => {
    if (todo.trim() === "") return; //空白のtodoは追加しない
    const newTodo: Todo = {
      id: Date.now(),
      title: todo,
      createdAt: new Date(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  // Todoの状態を変更する処理
  const toggleTodo = (id: number) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updateTodos);
  };

  // Todoを削除する処理
  const deleteTodo = (id: number) => {
    const deleteTodos = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodos);
  };

  // todosをフィルタリングしてfilteredTodosに格納した
  const filteredTodos = todos.filter((todo) => {
    if (filter === "uncompleted") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="todo">
      <div className="todo-input">
        <input
          type="text"
          placeholder="Todoを追加..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo}>追加</button>
      </div>
      <div className="todo-list">
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "uncompleted" | "completed")
          }
        >
          <option value="uncompleted">未完了</option>
          <option value="completed">完了</option>
        </select>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <p>{todo.title}</p>
              <p>{todo.createdAt.toLocaleString()}</p>
              <button onClick={() => deleteTodo(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoFunction;
