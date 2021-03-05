import { useState, useEffect, useRef } from "react";
import axios from "axios";
const url = "http://localhost:5000/todos";

function App() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const input = useRef(null);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.current.value) {
      axios
        .post(url, { todo: input.current.value })
        .then((response) => {
          const { data } = response;
          setTodos([...todos, data]);
          input.current.value = "";
        })
        .catch((error) => console.log(error));
    }
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <h2>Todo App</h2>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="what's you gonna do?" ref={input} />
          <input type="submit" value="enter" />
        </form>
      </div>
      <div className="list">
        {todos.map((todo) => (
          <p key={todo._id}>{todo.todo}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
