import express from "express";
import authRouter from './authRoutes'
import path from "path";
const app = express()

app.use('/api/auth',authRouter)

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
