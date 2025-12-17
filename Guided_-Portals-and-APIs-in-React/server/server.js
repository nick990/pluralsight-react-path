const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", cast: ["Leonardo DiCaprio", "Ellen Page"], runtime: "148 minutes", genre: ["Action", "Sci-Fi"] },
  { id: 2, title: "The Matrix", director: "The Wachowskis", cast: ["Keanu Reeves", "Laurence Fishburne"], runtime: "136 minutes", genre: ["Action", "Sci-Fi"] },
  { id: 3, title: "Interstellar", director: "Christopher Nolan", cast: ["Matthew McConaughey", "Anne Hathaway"], runtime: "169 minutes", genre: ["Adventure", "Drama", "Sci-Fi"] },
  { id: 4, title: "The Shawshank Redemption", director: "Frank D.", cast: ["Tim Robbins", "Morgan Freeman"], runtime: "142 minutes", genre: ["Drama"] },
  { id: 5, title: "Pulp Fiction", director: "Quentin Tarantino", cast: ["John Travolta", "Uma Thurman"], runtime: "154 minutes", genre: ["Crime", "Drama"] },
  { id: 6, title: "The Dark Knight", director: "Christopher Nolan", cast: ["Christian Bale", "Heath Ledger"], runtime: "152 minutes", genre: ["Action", "Crime", "Drama"] }
];

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// API endpoint to get a specific movie by ID
app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});

// Handles any requests that don't match the API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
