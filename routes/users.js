const express = require("express");
const users = require("../constants/users");
const app = express.Router();

app.get("/",(req,res) => {
    const Authentication = req.session;
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
            const user = {...match[0]};
            delete user.Password;
            req.session.Authentication = user;
            res.json({Success:true})
        }else if(match.length === 0){
            req.session.destroy(() => 
                res.status(401).json("Oops! Bad credentials."))
        }else{
            res.status(406).json("multiple user exists.")
        }
    }
})
app.post("/logout",(req,res) => {
    res.destroy();
    res.json({Success:true});
})

app.get("/login",(req,res) => {
    const Authentication = req.session.Authentication;
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