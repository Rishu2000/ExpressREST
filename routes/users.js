const express = require("express");
const users = require("../constants/users");
const app = express.Router();

app.use((req,res,next) => {
    const Authentication = req.session.Authentication;
    console.log(Authentication);
    if(Authentication || (req.path === "/" || req.path === "/login") && req.method === "POST"){
        next();
    }else{
        res.status(406).json("Please Login to see.");
    }
})

app.get("/",(req,res) => {
        res.json(users.map((user,key) => {
            const a = {UserID:key,...user};
            delete a.Password;
            return a;
        }));
});

app.post("/",(req,res) => {
    const user = {
        Username,
        Name,
        Password,
        LinkedIn
    } = req.body
    if(!Username || !Name || !Password){
        res.status(400).json({
            Success:false,
            Message:"Please enter at least Username, Password and Name."})
    }else{
        if(Username.trim().length < 4 || Name.trim().length < 4 || Password.trim().length < 4){
            res.status(400).json({
                Success:false,
                Message:"Username, Password and Name should be at least 4 character in length."
            });
        }else{
            const matches = users.filter((u) => u.Username === Username);
            if(matches.length > 0){
                res.status(409).json({
                    Success:false,
                    Message:"User already exists!"
                })
            }else{
            users.push({
                Username,
                Name,
                Password,
                LinkedIn
            });
            res.status(201).json({
                Success:true,
                Message:`User ${Username} has been added to the database.`
            })
        }
        }
    }
})

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
                res.status(401).json("Oops! Bad credentials! Try Again!"))
        }else if(match.length > 1){
            req.session.destroy(() => {
                res.status(500).json("multiple user matching.")
            })
        }
    }
})

app.post("/logout",(req,res) => {
    req.session.destroy();
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

app.delete("/:id",(req,res)=> {
    const id = +req.params.id;
    if(users[id]){
        delete users[id];
        res.status(204).json();
    }else{
        res.status(404).json("Error! User Not Found!");
    }
})

app.put("/:id",(req,res) => {
    const id = +req.params.id;
    if(users[id]){
        users[id] = req.body;
        res.status(202).json({
            Success:true,
            Message:`Updated the user ${users[id].Name}.`
        });
    }else{
        res.status(404).json("Error! User Not Found!");
    }
})

module.exports = app;