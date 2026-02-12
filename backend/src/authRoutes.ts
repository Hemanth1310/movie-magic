import express from 'express'
import { loginDetailSchema, registerSchema } from './utils/Typechecker';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { Prisma } from '@prisma/client';

const router = express.Router()

const JWT_secret = process.env.JWT_secret || "123456789";
router.use(express.json());

router.get('/userDetails',(req,res)=>{
    res.send('users')
})

router.post('/login',async(req,res)=>{
    const payload = req.body
    const result = loginDetailSchema.safeParse(payload)

    if(!result.success){
        res.status(400).json({
            message:result.error.issues[0].message
        })
        return
    }

    try{
        const user = await prisma.user.findUnique({
            where:{email:payload.email},
            select:{
                id:true,
                email:true,
                password:true,
                firstName:true,
                lastName:true,
                imagePath:true,
                isVerified:true,
            }
        })

        if(!user){
            return res.status(401).json({
                message:'User not found'
            })
        }
        if(!user.isVerified){
            return res.status(405).json({ 
                message: "Not Verified. Please verify and try again!" 
            });
        }

        const passwordMatch = await bcrypt.compare(payload.password, user.password);
        if(!passwordMatch){
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const tokenPayload = {
            userId:user.id,
            email:user.email
        }
        const token = jwt.sign(tokenPayload, JWT_secret, { expiresIn: "1hr" })

        const {password, ...userData} = user
         return res.json({
                message: "login successful!",
                token: token,
                payload: {
                ...userData,
        },
      });


    }catch (error: any) {
        if (error.code === "P2025") {
        return res.status(404).json({ message: "User not found. Verification failed." });
        }

        // 2. Handle JWT Specific Errors (Expired or Invalid)
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
        return res.status(403).json({
            message: "User token has expired or is not valid",
        });
        }

        // 3. Fallback for everything else (e.g., Database is down)
        console.error("Unexpected Error:", error);
        return res.status(500).json({ message: "Internal server error" });
  }

})

router.post('/register',async(req,res)=>{
    const { firstName, lastName, password, email } =
    req.body as Prisma.UserCreateInput
    const result = registerSchema.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({message:"Invalid Data"})
    }

    const hashedPassword =await bcrypt.hash(password,10)
    try{
        const user = await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password:hashedPassword
            }
        })

        if(!user){
            return res.status(405).json({
                message:"Request not precessed try again later!"
            })
        }

        return res.json({
            message:"Registration successfull, Please login to continue !!!"
        })
    }catch(err){
       if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                console.log('There is a unique constraint violation, a new user cannot be created with this ID')
                return res.status(409).json({ message: "A record with this email already exists." })
                }
        }else{
            return res.status(500).json({message:'Unexpected Error occured'})
        }


    }

})

export default router;