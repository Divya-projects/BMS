const Movies = require('../models/movieModel')

const addMovie = async (req, res) => {
    try{
        //add new movie doscument into db
        const newMovie = new Movies(req.body)
        await newMovie.save()
        res.status(200).json({ success: true, message: "New movie has been added"})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message})
    }
}

const getAllMovies = async (req, res) => {
    try{
        //get all movies from the db
        const allMovies = await Movies.find({}) 
        res.status(200).json({ success: true, message: "All movies have been fetched", data: allMovies})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message})
    }
}

// from home page 
const getMovieById = async (req, res) => {
    try{
        //get all movies from the db
        console.log('in get movie by id', req.params.movieId)
        const movieData = await Movies.findById(req.params.movieId) 
        res.status(200).json({ success: true, message: "All movies have been fetched", data: movieData})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message})
    }
}

const updateMovie = async (req, res) => {
    try{
        //update movie into db
        await Movies.findByIdAndUpdate(req.params.movieId, req.body)
        res.status(200).json({ success: true, message: "Movie has been updated"})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message})
    }
}

const deleteMovie = async (req, res) => {
    try{
        //add new movie doscument into db
        await Movies.findByIdAndDelete(req.params.movieId)
        res.status(200).json({ success: true, message: "Movie has been deleted"})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message})
    }
}
module.exports = { addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie }