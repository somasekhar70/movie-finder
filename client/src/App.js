import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import "./index.css";

function App() {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (title) => {
    if (!title) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/${title}`);
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("No results found!");
    }
  };

  return (
    <div className="app-container">
      <h1>🎬 Movie Finder</h1>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
