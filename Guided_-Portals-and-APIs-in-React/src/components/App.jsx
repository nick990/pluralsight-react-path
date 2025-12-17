import React, { useState } from "react";
import MovieList from "./MovieList";
import MovieModal from "./MovieModal";
import "./../styles/App.css";

const App = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  return (
    <div>
      <h1>Movie App</h1>
      <MovieList onMovieClick={handleMovieClick} />
      {selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
