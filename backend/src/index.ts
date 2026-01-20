import express from "express";

const app = express()

app.use('/')

app.get('/',(req,res)=>{

})

app.listen(3001,()=>{
    console.log("Listening at 3001")
})