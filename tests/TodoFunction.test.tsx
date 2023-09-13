import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import TodoFunction from "../src/componets/TodoFunction";
import { RecoilRoot } from "recoil";

test("Todoを追加", async () => {
  render(
    <RecoilRoot>
      <TodoFunction />
    </RecoilRoot>
  );

  // テキスト入力に新しいTodoを入力
  const input = screen.getByPlaceholderText("Todoを追加...");
  fireEvent.change(input, { target: { value: "New Todo" } });

  // 追加ボタンをクリック
  const addButton = screen.getByText("追加");
  fireEvent.click(addButton);

  // 新しいTodoがリストに表示されることを確認
  await waitFor(() => {
    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });
});

test("Todoのcheckboxの状態を変更", async () => {
  render(
    <RecoilRoot>
      <TodoFunction />
    </RecoilRoot>
  );

  // デフォルトでtodoを1つ表示する
  const input = screen.getByPlaceholderText("Todoを追加...");
  fireEvent.change(input, { target: { value: "New Todo" } });
  const addButton = screen.getByText("追加");
  fireEvent.click(addButton);

  // チェックボックスをクリック
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  // Todoが完了状態になることを確認
  await waitFor(() => {
    expect(checkbox).toBeChecked();
  });
});

test("Todoを削除", async () => {
  render(
    <RecoilRoot>
      <TodoFunction />
    </RecoilRoot>
  );

  // デフォルトでtodoを1つ表示する
  const input = screen.getByPlaceholderText("Todoを追加...");
  fireEvent.change(input, { target: { value: "New Todo" } });
  const addButton = screen.getByText("追加");
  fireEvent.click(addButton);

  // 削除ボタンをクリック
  const deleteButton = screen.getByText("削除");
  fireEvent.click(deleteButton);

  // Todoがリストから削除されることを確認
  await waitFor(() => {
    expect(screen.queryByText("New Todo")).not.toBeInTheDocument();
  });
});

test("完了したTodosを削除", async () => {
  render(
    <RecoilRoot>
      <TodoFunction />
    </RecoilRoot>
  );

  // デフォルトでtodoを2つ表示する
  const input = screen.getByPlaceholderText("Todoを追加...");
  fireEvent.change(input, { target: { value: "Todo1" } });
  const addButton = screen.getByText("追加");
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "Todo2" } });
  fireEvent.click(addButton);

  // チェックボックスをクリック
  const checkboxs = screen.getAllByRole("checkbox");
  fireEvent.click(checkboxs[0], [1]);

  // フィルタリングの状態を完了に変更
  const filterSelect = screen.getByRole("combobox");
  fireEvent.change(filterSelect, { target: { value: "completed" } });

  // 完了したtodoを全削除するボタンをクリック
  const completedTodosDelete = screen.getByText("完了したtodosを削除");
  fireEvent.click(completedTodosDelete);

  // 完了のtodoがないことを確認
  await waitFor(() => {
    expect(screen.queryAllByText(/Todo/)).toHaveLength(0);
  });
});

test("フィルタリングとチェックボックスの状態における動作", async () => {
  render(
    <RecoilRoot>
      <TodoFunction />
    </RecoilRoot>
  );

  const filterSelect = screen.getByRole("combobox");

  // デフォルトで未完了のtodoを1つ表示する
  const input = screen.getByPlaceholderText("Todoを追加...");
  fireEvent.change(input, { target: { value: "New Todo" } });
  const addButton = screen.getByText("追加");
  fireEvent.click(addButton);

  // 未完了のtodoがあることを確認
  await waitFor(() => {
    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  // フィルタリングの状態を完了に変更
  fireEvent.change(filterSelect, { target: { value: "completed" } });

  // 完了のtodoがないことを確認
  await waitFor(() => {
    expect(screen.queryByText("New Todo")).not.toBeInTheDocument();
  });

  // フィルタリングの状態を未完了に変更
  fireEvent.change(filterSelect, { target: { value: "uncompleted" } });

  // チェックボックスをクリック
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  // 未完了のtodoがないことを確認
  await waitFor(() => {
    expect(screen.queryByText("New Todo")).not.toBeInTheDocument();
  });

  // フィルタリングの状態を完了に変更
  fireEvent.change(filterSelect, { target: { value: "completed" } });

  // 完了のtodoがあることを確認
  await waitFor(() => {
    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });
});
