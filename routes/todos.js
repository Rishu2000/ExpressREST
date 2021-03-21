const express = require("express");
const todos = require("../constants/todos");
const app = express.Router();

app.get("/",(req,res) => {
    res.json(todos);
});

app.get("/:id",(req,res) => {
    const id = +req.params.id;
    if(todos[id]){
        res.json(todos[id])
    }else{
        res.status(404).json("Error! Todo Not Found!");
    }
});

module.exports = app;