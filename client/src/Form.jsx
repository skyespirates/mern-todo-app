import React, { useRef } from "react";
import { TextField } from "@material-ui/core";
import { useStyles } from "./styles";
import axios from "axios";
const url = "http://localhost:5000/todos";
export default function Form({ fetchData }) {
  const classes = useStyles();
  const textField = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(url, { todo: textField.current.value });
    textField.current.value = "";
    fetchData();
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
