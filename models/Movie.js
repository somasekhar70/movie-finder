import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  Title: String,
  Year: String,
  Poster: String
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);
