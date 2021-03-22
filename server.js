const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const root = require("./routes/root")
const app = express();
const port = 80;

app.use(express.json());
app.use(
    session({
        secret: "corona",
        resave:false,
        saveUninitialized:false
    }))
app.use(morgan("dev"));
app.use("/",root);


app.listen(port,() =>{
    console.log("server started in "+port);
});