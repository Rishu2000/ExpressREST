const express = require("express");
const users = require("./users");
const todos = require("./todos");
const app = express.Router();

app.get("/",(req,res) => {
    res.json("Welcome to api server.");
});

app.use("/users",users);
app.use("/todos",todos);

module.exports = app;