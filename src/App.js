import { useState } from "react";
import Btn from "./Button";

function App() {
  const [todo, setTodo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") {
      return;
    }
    setToDos((currentArray) => [todo, ...currentArray]);
    setTodo("");
  };
  const onDelete = (index) => {
    setToDos((current) => current.filter((_, i) => i !== index));
  };
  return (
    <div>
      <h1>My Todo List : ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={todo}
          type="text"
          placeholder="Put your todo"
        ></input>
        <button>Add</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>
            {item}
            <Btn text="Delete" onClick={() => onDelete(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
