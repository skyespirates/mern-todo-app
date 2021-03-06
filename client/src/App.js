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
  const handleUpdate = (id) => {
    axios
      .get(`${url}/${id}`)
      .then((response) => {
        const { todo } = response.data;
        input.current.value = todo;
      })
      .catch((error) => console.log(error));
    // axios.patch(`${url}/${id}`, {});
  };
  const handleDelete = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then((response) => {
        const { _id: id } = response.data;
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.log(error));
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
          <div key={todo._id} className="todo">
            <p>{todo.todo}</p>
            <button onClick={() => handleUpdate(todo._id)}>update</button>
            <button onClick={() => handleDelete(todo._id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
