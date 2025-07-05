const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const EmailHelper = require('../util/EmailHelper')

function otpGenerator() {
    return Math.floor(Math.random() * 10000 + 90000)
}

const registerUser = async (req, res) => {
    try{
            const userExists = await User.findOne({ email: req.body.email })
            console.log('usersssssssss', req.body)
            if (userExists) {
                return res.send({ success: false, message: 'User already exists',})
            }
            
            //encrypt the password & then save it in DB
            const salt = await bcrypt.genSalt(10)
            console.log('generated salt', salt)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            console.log('hashed pw', hashedPassword)
            req.body.password = hashedPassword

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
        console.log('emmmmmm', req.body)
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.send({ success: false, message: 'User does not exists, Please register.',})
        }
        
        //validate the password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword){
            return res.send({ success: false,
                message: "Sorry, invalid password entered",
            })
        }

        //generating JWT 
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        console.log('token generated', token)

        // if (req.body.password !== user.password) {
        //     return res.send({ success: false,
        //         message: "Sorry, invalid password entered",
        //     })
        // }

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
        console.log('user fetched in get curr user', req.body)
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

const forgetPassword = async (req, res) => {
    console.log('inside forget pw server side', req.body.email)
    try{
        /**
         * 1. fetch email from req
         * 2. check if email exists in db or not
         * 3. if email doesnot exist -> send res as user not found
         * 4. if email exist -> generate otp & send email
         * 5. stores the otp & expiry in usermodel db 
         */
        console.log('inside forget pw server side', req.body.email)
        if (req.body.email === undefined){
            return res.status(401).json({
                success: false,
                message: "Please enter the email for forget password"
            })
        }

        const user = await User.findOne({ email: req.body.email})

        if (!user){
            return res.status(404).json({
                success: false,
                message: `User not found for ${req.body.email}`
            })
        }

        //user exists in db, now generate otp
        const otp = otpGenerator()

        // save it in db
        user.otp = otp
        user.otpExpiry = Date.now() + 10 * 60 * 1000 //now + 10 mins
        await user.save()

        res.status(200).json({
            success: true,
            message: `Otp send to the email: ${req.body.email}`
        })

        //send the otp to the mailId
        await EmailHelper("otp.html", user.email, { name: user.name, otp: otp })
        } catch(e){
            console.log('error in forget password')
        res.status(500).json({success: false, message: e.message})
    }
}

const resetPassword = async (req, res) => {
    try{
        let resetDetails = req.body

        if (!resetDetails.password || !resetDetails.otp ){
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            })
        }

        const user = await User.findOne({ otp: resetDetails.otp })

        if (!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        //check for otp expiry
        if (Date.now() > user.otpExpiry){
            return res.status(401).json({
                success: false,
                message: "Otp expired"
            })
        }
        
        // Hash the password before saving in DB
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(resetDetails.password, salt)
        resetDetails.password = hashedPassword

        user.password = resetDetails.password
        user.otp = undefined
        user.otpExpiry = undefined

        await user.save()

        res.status(200).json({
            success: true,
            message: "password reset was successful"
        })
    } catch(e){
        res.status(500).json({success: false, message: e})
    }
}

module.exports = { registerUser, loginUser, getCurrentUser, forgetPassword, resetPassword }