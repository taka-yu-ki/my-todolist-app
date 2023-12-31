import { RecoilRoot } from "recoil";
import "./App.css";
import TodoFunction from "./components/TodoFunction";

function App() {
  return (
    <div className="App">
      <h1>TodoList</h1>
      <RecoilRoot>
        <TodoFunction />
      </RecoilRoot>
    </div>
  );
}

export default App;
