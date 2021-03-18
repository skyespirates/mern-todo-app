const express = require("express");
const router = express.Router();
const Todo = require("./todo");

router.get("/", async (req, res) => {
  // Todo.insertMany([
  //   { todo: "running" },
  //   { todo: "swimming" },
  //   { todo: "reading" },
  //   { todo: "walking" },
  //   { todo: "studying" },
  // ]);
  const todos = await Todo.find();
  res.send(todos);
});
router.post("/", async (req, res) => {
  const todo = new Todo(req.body);
  const newTodo = await todo.save();
  res.send(newTodo);
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.send(updatedTodo);
});
router.delete("/", async (req, res) => {
  await Todo.deleteMany();
  res.status(200).send("successfully clear all");
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  res.status(200).send(deletedTodo);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.send(todo);
});
module.exports = router;
