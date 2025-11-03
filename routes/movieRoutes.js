import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Movie from "../models/Movie.js";

dotenv.config();
const router = express.Router();

router.get("/:title", async (req, res) => {
  const title = req.params.title;
  const apiKey = process.env.OMDB_API_KEY;

  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${apiKey}`);

    if (response.data && response.data.Response === "True") {
      const movies = response.data.Search.map(movie => ({
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster
      }));
      res.json(movies);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching data from OMDb:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
