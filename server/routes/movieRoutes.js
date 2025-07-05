const express = require('express')
const movieRouter = express.Router()
const { addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } = require('../controllers/movieController')


movieRouter.post('/add-movie', addMovie)
movieRouter.get('/get-all-movies', getAllMovies)
movieRouter.get('/get-movie/:movieId', getMovieById)
movieRouter.put('/update-movie/:movieId', updateMovie)
movieRouter.delete('/delete-movie/:movieId', deleteMovie)

module.exports = movieRouter