import { atom } from "recoil";

// todoの型定義
interface Todo {
  id: number;
  title: string;
  createdAt: Date;
  completed: boolean;
}

// todosの管理
export const todosAtom = atom<Todo[]>({
  key: "todosAtom",
  default: [],
});
