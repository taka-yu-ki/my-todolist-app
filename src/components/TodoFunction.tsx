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

  //文字の上限を設定
  const maxCount = 50;

  // Todoを追加する処理
  const addTodo = () => {
    if (todo.trim() === "") {
      setError("Todoを入力してください");
      return;
    } else if (todo.length > maxCount) {
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

  // 完了したTodosを削除する処理
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            type="text"
            placeholder="Todoを追加..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">追加</button>
        </form>
        <p className="counter">
          文字数: {todo.length}/{maxCount}
        </p>
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
              <p className="title">{todo.title}</p>
              <p className="createdAt">{todo.createdAt.toLocaleString()}</p>
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
