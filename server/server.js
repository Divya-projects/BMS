const express = require("express")
const userRouter = require('./routes/userRoutes.js')
const cors = require('cors')

//to access env var
require("dotenv").config()

//connection to mongo db
require('./config/db.js')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/users', userRouter)

app.listen(8082, () => {
    console.log('Server is running')
})