import React, { useState } from "react";
import "../TodoFunction.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { todosAtom } from "../recoil/atoms/todosAtom";
import { filterStateAtom } from "../recoil/atoms/filterStateAtom";
import { filteredTodosSelector } from "../recoil/selectors/filteredTodosSelector";

const TodoFunction: React.FC = () => {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [todo, setTodo] = useState<string>("");
  const [filter, setFilter] = useRecoilState(filterStateAtom);
  const filteredTodos = useRecoilValue(filteredTodosSelector);
  const [error, setError] = useState<string | null>(null);

  // Todoを追加する処理
  const addTodo = () => {
    if (todo.trim() === "") {
      setError("Todoを入力してください");
      return;
    } else if (todo.length > 16) {
      setError("文字数がオーバーしています");
      return;
    }
    const newTodo = {
      id: Date.now(),
      title: todo,
      createdAt: new Date(),
      completed: false,
    };
    try {
      setTodos([newTodo, ...todos]);
      setTodo("");
      setError(null);
    } catch {
      setError("追加に失敗しました");
    }
  };

  // Todoの状態を変更する処理
  const toggleTodo = (id: number) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    try {
      setTodos(updateTodos);
      setError(null);
    } catch {
      setError("変更に失敗しました");
    }
  };

  // Todoを削除する処理
  const deleteTodo = (id: number) => {
    const deleteTodos = todos.filter((todo) => todo.id !== id);
    try {
      setTodos(deleteTodos);
      setError(null);
    } catch {
      setError("削除に失敗しました");
    }
  };

  const deleteCompletedTodos = () => {
    const deleteCompletedTodos = todos.filter(
      (todo) => todo.completed === false
    );
    try {
      setTodos(deleteCompletedTodos);
      setError(null);
    } catch {
      setError("削除に失敗しました");
    }
  };

  return (
    <div className="todo">
      <div className="todo-input">
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Todoを追加..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo}>追加</button>
      </div>
      <div className="todo-list">
        <div className="todo-list-top">
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "uncompleted" | "completed")
            }
          >
            <option value="uncompleted">未完了</option>
            <option value="completed">完了</option>
          </select>
          {filter === "completed" && (
            <button className="all-delete" onClick={deleteCompletedTodos}>
              完了したtodosを削除
            </button>
          )}
        </div>

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
              <button
                className="button delete"
                onClick={() => deleteTodo(todo.id)}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoFunction;
