import express from "express";
import authRouter from './authRoutes'
const app = express()

app.use('/api/auth',authRouter)

app.listen(3008,()=>{
    console.log("Listening at 3008")
})
