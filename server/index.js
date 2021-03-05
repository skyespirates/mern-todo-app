const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

const DB_URL = "mongodb://localhost:27017/todo-app";
const PORT = 5000;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("CONNECTED TO MONGOO DB");
  })
  .catch((err) => {
    console.log("OH NO SOMETHING WENT WRONG");
    console.log(err);
  });

const todoRoutes = require("./router");
app.use("/todos", todoRoutes);
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Skyes Crawford API</h1>");
});

app.listen(PORT, () => {
  console.log(`Listenin on port: ${PORT}`);
});
