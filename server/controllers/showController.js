const Show = require('../models/showModel')

const addShow = async (req, res) => {
    try{
        const newShow = new Show(req.body)
        await newShow.save()
        res.status(200).json({
            success: true,
            message: "New Show has been added"
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: "Error adding show"
        })
    }

}

const getAllShowsByTheatre = async (req, res) => {
    try{
        const allShows = await Show.find({ theatre: req.params.theatreId}).populate('movie')
        res.status(200).json({
            success: true,
            message: "All Shows has been fetched by theatre id",
            data: allShows
        })    
    } catch(err){
        res.status(500).json({
            success: false,
            message: "Error fetching all Shows by theatre id"
        })
    }

}

const getAllTheatresByMovie = async (req, res) => {
    try{
       const { movieId, date } = req.params;
       console.log('get all theares for movie', movieId, new Date(date).toISOString())
        const shows = await Show.find({
                        movie: movieId,
                        date: new Date(date).toISOString(),
                        }).populate("theatre");
        console.log('showsss', shows)
        let uniqueTheatres = [];
        shows.forEach((show) => {
        let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id == show.theatre._id
      );
      console.log('is theatre', isTheatre)
      if (!isTheatre) {
        let showsOfThisTheatre =
          shows.filter((showObj) => showObj.theatre._id == show.theatre._id);
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });

    res.send({
      success: true,
      message: "All shows fetched",
      data: uniqueTheatres,
    });     
    } catch(err){
        console.log('failed fetching all theatres by movie', err.message)
        res.status(500).json({ success: false, message: err.message })
    }

}

const getShowById = async (req, res) => {
    try{
        const show = await Show.findById(req.params.showId).populate('movie')
        .populate('theatre')
        res.send({
            success: true,
            message: "Show details fetched successfully",
            data: show,
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: "Error fetching shows by id"
        })
    }

}

const updateShow = async (req, res) => {
    try{
        await Show.findByIdAndUpdate(req.params.showId, req.body)
        res.status(200).json({
            success: true,
            message: "Show has been updated"
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: "Error updating Show"
        })
    }

}

const deleteShow = async (req, res) => {
    try{
        await Show.findByIdAndDelete(req.params.showId)
        console.log('delete show from server side', req.params.showId)
        res.status(200).json({
            success: true,
            message: "Show has been deleted"
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: "Error deleting Show"
        })
    }

}

module.exports = {
    addShow,
    getAllShowsByTheatre,
    getAllTheatresByMovie,
    getShowById,
    updateShow,
    deleteShow  
}