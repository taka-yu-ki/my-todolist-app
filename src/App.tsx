import { RecoilRoot } from "recoil";
import "./App.css";
import Todo from "./componets/Todo";

function App() {
  return (
    <div className="App">
      <h1>TodoList</h1>
      <RecoilRoot>
        <Todo />
      </RecoilRoot>
    </div>
  );
}

export default App;
