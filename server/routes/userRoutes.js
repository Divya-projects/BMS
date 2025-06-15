const express = require('express')
const User = require('../models/userModel')
const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
    try{
        const userExists = await User.findOne({ email: req.body.email })
        console.log('usersssssssss', userExists)
        if (userExists) {
            return res.send({ success: false, message: 'User already exists',})
        }

        const newUser = new User(req.body)
        await newUser.save()

        res.send({success: true, 
            message: "Registered successfully. Please login",
        })
    }
    catch(e){
        console.log('error registering', e)
        res.send({ success: false, 
            message: 'Something went wrong on server side.',})
    }
})

userRouter.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.send({ success: false, message: 'User does not exists, Please register.',})
        }

        if (req.body.password !== user.password) {
            return res.send({ success: false,
                message: "Sorry, invalid password entered",
            })
        }

        res.send({success: true, 
            message: "You have Successfully logged in.",
        })
    }
    catch(e){
        console.log('error registering', e)
        res.send({ success: false, 
            message: 'Something went wrong on server side.',})
    }
})

module.exports = userRouter