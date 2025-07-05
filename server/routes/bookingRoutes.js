const express = require('express')
const bookingRouter = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { makePayment, bookShow, getAllBookings } = require('../controllers/bookingController')

bookingRouter.post('/make-payment', authMiddleware, makePayment)
bookingRouter.get('/book-show', authMiddleware, bookShow)
bookingRouter.get('/get-all-bookings', authMiddleware, getAllBookings)

module.exports = bookingRouter