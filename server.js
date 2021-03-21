const express = require("express");
const root = require("./routes/root")
const app = express();
const port = 80;

app.use("/",root);

// const todos = ["Milk","Curd","Suger"]

// app.get("/",(req,res) => {
//     res.json("Welcome to GFGs API Server!")
// });

// app.get("/api/",(req,res) => {
//     res.json("This is the root of API server")
// });

// app.get("/api/todos/:id",(req,res) => {
//     if(!todos[+req.params.id]){
//         res.status(404).json("error! Cannot find it!")
//     }else{
//         res.json(todos[+req.params.id]);
//     }
// })

app.listen(port,() =>{
    console.log("server started in "+port);
});