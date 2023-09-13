import { selector } from "recoil";
import { todosAtom } from "../atoms/todosAtom";
import { filterStateAtom } from "../atoms/filterStateAtom";

// todosをフィルタリングして返す処理
export const filteredTodosSelector = selector({
  key: "filteredTodosSelector",
  get: ({ get }) => {
    const todos = get(todosAtom);
    const filter = get(filterStateAtom);

    return todos.filter((todo) => {
      if (filter === "uncompleted") {
        return !todo.completed;
      } else if (filter === "completed") {
        return todo.completed;
      } else {
        return true;
      }
    });
  },
});
