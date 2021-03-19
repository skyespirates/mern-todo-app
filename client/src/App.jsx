import { useState, useEffect } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  Button,
  // TextField,
} from "@material-ui/core";
import Form from "./Form";
import Item from "./Item";
import { useStyles } from "./styles";
import axios from "axios";
const url = "http://localhost:5000/todos";

function App() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const classes = useStyles();
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const { data } = response;
      setLoading(false);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      const newTodos = todos.filter((todo) => todo._id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClear = async () => {
    try {
      await axios.delete(url);
      setTodos([]);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Typography align="center" variant="h4" className={classes.header}>
          Todo App
        </Typography>
        <Form fetchData={fetchData} />
        <List>
          {todos.map((todo) => (
            <Item key={todo._id} {...todo} handleDelete={handleDelete} />
          ))}
        </List>
        <Button
          className={classes.clearBtn}
          variant="contained"
          color="secondary"
          onClick={handleClear}
        >
          Clear
        </Button>
      </Container>
    </>
  );
}

export default App;
