const express = require("express");
const app = express.Router();

app.get("/",(req,res) => {
    res.json("Welcome to users.js");
});

module.exports = app;