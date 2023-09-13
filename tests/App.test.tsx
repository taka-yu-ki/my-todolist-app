import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "../src/App";

test("renders TodoFunction component inside App", () => {
  render(<App />);

  // "TodoList"というテキストが表示されていることを確認
  const todoListTitle = screen.getByText(/TodoList/i);
  expect(todoListTitle).toBeInTheDocument();
});
