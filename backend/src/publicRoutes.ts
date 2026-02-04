import express from "express";
import { prisma } from "./prisma";

const router = express.Router();

router.use(express.json());

router.get("/all-movies", async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();

    if (movies.length <= 0) {
      return res.status(404).json({ message: "Movies data not found" });
    }

    return res.json({
      payload: {
        movies: movies,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.get('/screenings/:movieId',async(req,res)=>{
    const {movieId} = req.params

    try{
        const screeningDetails = await prisma.showtime.findMany({
            where:{movieId:movieId},
            include:{
                movie:true,
                screen:{
                    include:{
                        theater:true
                    }
                }
            }
        }) 

        if(screeningDetails.length<=0){
            return res.status(404).json({
            message:'Screening detials for requested movie not available'
        })
        }

        return res.json({
            message:'Screeing details',
            payload:{
                screeningDetails
            }
        })
    }catch(err){
        return res.status(500).json({
            message:'Internal Server Error'
        })
    }
})

export default router