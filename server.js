const express = require("express");
const morgan = require("morgan");
const root = require("./routes/root")
const app = express();
const port = 80;

app.use(morgan("dev"));
app.use("/",root);


app.listen(port,() =>{
    console.log("server started in "+port);
});