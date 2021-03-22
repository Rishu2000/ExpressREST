const express = require("express");
const users = require("../constants/users");
const app = express.Router();

let Authentication = false;

app.use(express.json());

app.get("/",(req,res) => {
    if(Authentication){
        res.json(users.map((user,key) => {
            const a = {UserID:key,...user};
            delete a.Password;
            return a;
        }));
    }
    else {
        res.status(406).json("Please Login to see.");
    }
});

app.post("/login",(req,res) => {
    const {Username,Password} = req.body;
    if(!Username || !Password)
        res.status(400).json("Require both Username and Password");
    else{
        const match = users.filter(u => u.Username.toLowerCase() === Username.toLowerCase() && u.Password === Password)
        if(match.length === 1){
            Authentication = true;
            res.json({Success:true})
        }else if(match.length === 0){
            Authentication = false;
            res.status(401).json("Oops! Bad credentials.")
        }else{
            res.status(406).json("multiple user exists.")
        }
    }
})

app.get("/login",(req,res) => {
    res.json({Authentication});
})

app.get("/:id",(req,res) => {
    const id = +req.params.id;
    if(users[id]){
        const a = {UserID:id,...users[id]};
        delete a.Password;
        res.json(a);
    }else{
        res.status(404).json("Error! User Not Found!");
    }
});

module.exports = app;