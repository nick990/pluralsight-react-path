import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './../styles/MovieModal.css';

const MovieModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details here
  }, [movieId]);

  if (!movie) return null;

  return "";
};

export default MovieModal;
