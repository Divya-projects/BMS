const express = require('express')
const theatreRouter = express.Router()
const { addTheatre, 
    getAllTheatres, 
    getAllTheatresForAnOwner, 
    updateTheatre, 
    deleteTheatre } = require('../controllers/theatreController')


theatreRouter.post('/add-theatre', addTheatre)
theatreRouter.get('/get-all-theatres', getAllTheatres) //for admin page
theatreRouter.get('/get-all-theatres/:ownerId', getAllTheatresForAnOwner) // for an individual partner
theatreRouter.put('/update-theatre/:theatreId', updateTheatre)
theatreRouter.delete('/delete-theatre/:theatreId', deleteTheatre)

module.exports = theatreRouter