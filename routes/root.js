const express = require("express");
const api = require("./api");
const app = express.Router();

app.get("/",(req,res) => {
    if(req.headers["user-agent"].toLowerCase().indexOf("postman") > -1){
        res.json("Welcome Developer.")
    }else{    
        res.json("Welcome to GFGs API server.");
    }
});

app.use("/api",api);

module.exports = app;