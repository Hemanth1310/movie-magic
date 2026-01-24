import express from "express";
import { prisma } from "./prisma";

const router = express.Router();

router.use(express.json());

router.get("/all-movies", async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();

    if (movies.length <= 0) {
      res.status(404).json({ message: "Movies data not found" });
    }

    res.json({
      payload: {
        movies: movies,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default router