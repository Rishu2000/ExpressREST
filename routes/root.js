const express = require("express");
const api = require("./api");
const app = express.Router();

app.get("/",(req,res) => {
    console.log(req.headers);
    res.json("Welcome to GFGs API server.");
});

app.use("/api",api);

module.exports = app;