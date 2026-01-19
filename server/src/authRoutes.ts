import express from 'express'

const router = express.Router()

router.get('/userDetails',(req,res)=>{
    res.send('users')
})