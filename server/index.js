const express = require('express');

const app =express();
const TokenRoute = require("./router/token");


const PORT=5000
app.get ('/', (req,res)=> {
    res.send("working");

})

app.use("/token" , TokenRoute)

app.listen(PORT , ()=> {
    console.log("SERVER IS RUNNING")
})