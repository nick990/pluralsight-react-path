import React, { useState } from 'react';
import MovieList from './MovieList';
import MovieModal from './MovieModal';
import './../styles/App.css';

const App = () => {
  //  Task 2.4
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Task 2.5
  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  // Task 4.1
  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  return (
    <div>
      <h1>Movie App</h1>
      {/* Task 2.6 */}
      <MovieList onMovieClick={handleMovieClick} />

      {/* Task 4.2 */}
      {selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
