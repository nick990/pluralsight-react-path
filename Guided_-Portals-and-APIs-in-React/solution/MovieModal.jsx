import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './../styles/MovieModal.css';

const MovieModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);

  {/* Task 3.6 */}
  useEffect(() => {
    fetch(`/api/movies/${movieId}`)
      .then(response => response.json())
      .then(data => setMovie(data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [movieId]);

  if (!movie) return null;

  {/* Task 3.1 */}
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        {/* Task 4.3 */}
        <button onClick={onClose}>Close</button>
        {/* Task 3.2 */}
        <h2>{movie.title}</h2>
        {/* Task 3.3 */}
        <p>Directed by: {movie.director}</p>
        {/* Task 3.4 */}
        <p>{movie.description}</p>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default MovieModal;
