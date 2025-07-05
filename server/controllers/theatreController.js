const Theatres = require('../models/theatreModel')

const addTheatre = async (req, res) => {
    try{
        //add new theatre doscument into db
        const newTheatre = new Theatres(req.body)
        await newTheatre.save()
        res.status(200).json({ success: true, message: "New theatre has been added"})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message})
    }
}

const getAllTheatres = async (req, res) => {
    try{
        //get all theatres for admin route from the db
        const allTheatres = await Theatres.find({}).populate("owner") 
        res.status(200).json({ success: true, message: "All theatres have been fetched", data: allTheatres})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message})
    }
}

const getAllTheatresForAnOwner = async (req, res) => {
    try{
        //get all theatres belongs to an individual partner from the db
        const allTheatres = await Theatres.find({owner: req.params.ownerId}).populate("owner")
        res.status(200).json({ success: true, message: "All theatres have been fetched", data: allTheatres})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message})
    }
}

const updateTheatre = async (req, res) => {
    try{
        //update theatre into db
        await Theatres.findByIdAndUpdate(req.params.theatreId, req.body)
        res.status(200).json({ success: true, message: "Theatre has been updated"})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message})
    }
}

const deleteTheatre = async (req, res) => {
    try{
        //delete theatre doscument from db
        await Theatres.findByIdAndDelete(req.params.theatreId)
        res.status(200).json({ success: true, message: "Theatre has been deleted"})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message})
    }
}
module.exports = { addTheatre, getAllTheatres, getAllTheatresForAnOwner, updateTheatre, deleteTheatre }