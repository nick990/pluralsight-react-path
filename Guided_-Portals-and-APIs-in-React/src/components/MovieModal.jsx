import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./../styles/MovieModal.css";

const MovieModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`/api/movies/${movieId}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie:", error));
  }, [movieId]);

  if (!movie) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>{movie.title}</h2>
        <p>Directed by: {movie.director}</p>
        <p>{movie.description}</p>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default MovieModal;
