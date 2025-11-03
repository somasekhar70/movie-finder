import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

// ✅ Connect MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// ✅ Movie Schema
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String,
});

const Movie = mongoose.model("Movie", movieSchema);

// ✅ Route: Fetch Movies from OMDB & Store in DB
app.get("/api/movies/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}`
    );

    if (response.data.Response === "False") {
      return res.status(404).json({ message: "Movie not found" });
    }

    const movies = response.data.Search.map((movie) => ({
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));

    // Store in MongoDB (optional)
    await Movie.insertMany(movies, { ordered: false }).catch(() => {}); // ignore duplicates

    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Serve React Frontend (Works for Local + Vercel)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
