import React, { useState, useEffect } from "react";

const MovieList = ({ onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} onClick={() => onMovieClick(movie.id)}>
            {movie.title} by {movie.director}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
