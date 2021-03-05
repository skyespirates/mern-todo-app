const express = require("express");
const router = express.Router();
const Todo = require("./todo");

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});
router.post("/", async (req, res) => {
  const todo = new Todo(req.body);
  const newTodo = await todo.save();
  res.send(newTodo);
});

module.exports = router;
