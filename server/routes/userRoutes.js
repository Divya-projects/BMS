const express = require('express')
const userRouter = express.Router()
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController')
const authMiddleware = require("../middlewares/authMiddleware")

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/get-current-user', authMiddleware, getCurrentUser)

module.exports = userRouter