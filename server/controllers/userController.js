const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
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
}

const loginUser = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.send({ success: false, message: 'User does not exists, Please register.',})
        }
        
        //generating JWT 
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        console.log('token generated', token)

        if (req.body.password !== user.password) {
            return res.send({ success: false,
                message: "Sorry, invalid password entered",
            })
        }

        res.send({success: true, 
            message: "You have Successfully logged in.",
            data: token,
        })
    }
    catch(e){
        console.log('error registering', e)
        res.send({ success: false, 
            message: 'Something went wrong on server side.',})
    }
}

const getCurrentUser = async (req, res) => {
    try {
        console.log('server side get curr user', req.headers)
        const user = await User.findById(req.body.userId).select("-password")
        console.log('user fetched in get curr user', req.body.userId)
        res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        })
    }
    catch(e){
        res.status(500).json({success: false, message: e})
    } 
}
module.exports = { registerUser, loginUser, getCurrentUser }