const express = require("express")
const userRouter = require('./routes/userRoutes.js')
const cors = require('cors')
const path = require('path')
const movieRouter = require("./routes/movieRoutes.js")
const theatreRouter = require("./routes/theatreRoutes.js")
const showRouter = require("./routes/showRoutes.js")
const bookingRouter = require('./routes/bookingRoutes.js')
const rateLimit = require('express-rate-limit')

//to access env var
require("dotenv").config()

//connection to mongo db
require('./config/db.js')

//configure rate limit
const appLimit = rateLimit({
    windowMs : 15 * 60 * 1000,
    max: 100, //limit each IP to max 2 requests per windowMs
    message: "Too many requests from this IP. Please try again in 15 minutes"
})
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', appLimit)

app.use('/api/users', userRouter) //for all the user operations
app.use('/api/movies', movieRouter) //for all the movie operations
app.use('/api/theatres', theatreRouter) //for all the theatre operations
app.use('/api/shows', showRouter) //for all the show operations
app.use('/api/bookings', bookingRouter) //for all the booking operations

const filePath = path.resolve(__dirname, '../client/dist')
console.log('divvvvvvvvv', filePath)
app.use(express.static(filePath))

app.get('/{*any}', (req, res) => {
    console.log('absolute path of html',filePath)
    res.sendFile(path.resolve(filePath, 'index.html'))
})

app.listen(8082, () => {
    console.log('Server is running')
})