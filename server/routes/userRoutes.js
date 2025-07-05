const express = require('express')
const userRouter = express.Router()
const { registerUser, loginUser, getCurrentUser, forgetPassword, resetPassword } = require('../controllers/userController')
const authMiddleware = require("../middlewares/authMiddleware")

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/get-current-user', authMiddleware, getCurrentUser)

userRouter.patch('/forget-password', forgetPassword)

userRouter.patch('/reset-password', resetPassword)

module.exports = userRouter