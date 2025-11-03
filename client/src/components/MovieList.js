import React from "react";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return <p>No movies found. Try searching!</p>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div key={index} className="movie-card">
          <img src={movie.poster} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
