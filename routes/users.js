const express = require("express");
const users = require("../constants/users");
const app = express.Router();

app.get("/",(req,res) => {
    res.json(users.map((user) => {
        const a = {...user};
        delete a.Password;
        return a;
    }));
});

app.get("/:id",(req,res) => {
    const id = +req.params.id;
    if(users[id]){
        const a = {...users[id]};
        delete a.Password;
        res.json(a);
    }else{
        res.status(404).json("Error! User Not Found!");
    }
});

module.exports = app;