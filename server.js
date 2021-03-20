const express = require("express");
const app = express();
const port = 80;

app.get("/",(req,res) => {
    res.json("Hello, GFG!")
});

app.listen(port,() =>{
    console.log("server started in "+port);
});

// Mapping
//     (basic)                         (user friendly)
//     fetch                              Axios
//     http-server                        express