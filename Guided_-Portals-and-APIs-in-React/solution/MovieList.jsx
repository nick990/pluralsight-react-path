import React, { useState, useEffect } from 'react';

const MovieList = ({ onMovieClick }) => {
  // Task 2.1
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Task 2.2
    fetch('/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <ul>
        {/* Task 2.3 */}
        {movies.map(movie => (
          <li key={movie.id} onClick={() => onMovieClick(movie.id)}>
            {movie.title} by {movie.director}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
