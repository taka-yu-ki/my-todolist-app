import { atom } from "recoil";

// selectの状態の管理
export const filterStateAtom = atom<"uncompleted" | "completed">({
  key: "filterStateAtom",
  default: "uncompleted",
});
