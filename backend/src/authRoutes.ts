import express from 'express'

const router = express.Router()

const JWT_secret = process.env.JWT_secret || "123456789";
router.use(express.json());

router.get('/userDetails',(req,res)=>{
    res.send('users')
})

export default router;