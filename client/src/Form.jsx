import React, { useRef } from "react";
import { TextField } from "@material-ui/core";
import { useStyles } from "./styles";
import axios from "axios";
const url = "http://localhost:5000/todos";
export default function Form({ todos, setTodos, setLoading }) {
  const classes = useStyles();
  const textField = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(url, { todo: textField.current.value });
    if (textField.current.value) {
      axios
        .get(url)
        .then(({ data }) => setTodos(data))
        .catch((error) => console.log(error));
    }
    textField.current.value = "";
  };
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        inputRef={textField}
        id="outlined-basic"
        label="what you're gonna do?"
        variant="outlined"
        className={classes.textInput}
      />
    </form>
  );
}
