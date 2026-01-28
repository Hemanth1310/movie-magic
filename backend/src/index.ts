import express from "express";
import authRouter from './authRoutes'
import path from "path";
import cors from 'cors'
import { prisma } from "./prisma";
import publicRouter from "./publicRoutes";
const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use('/api/auth',authRouter)
app.use('/api/publicRoutes',publicRouter)

const publicPath = path.join(__dirname, '..',"public")

app.use('/images',express.static('public'))

app.get('/images/:filename',(req,res)=>{
    const filename = req.params.filename
    const imagePath = path.join(publicPath,filename)

    if(!imagePath){
        res.status(400).json({
            message:"Invalid method."
        })
    }

    res.sendFile(imagePath,(err)=>{
        res.status(405).json({
            message:'Image not found'
        })
    })
})

app.listen(3008,()=>{
    console.log("Listening at 3008")
})
