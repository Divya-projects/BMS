const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false}
})

// Pre save hook
userSchema.pre('save', (next) => {
    console.log("Pre save hook")
    const now = new Date()
    this.updatedAt = now
    if (!this.createdAt){
        this.createdAt = now
    }
    next()
})

// Post save hook
userSchema.post('save', (document, next) => {
    console.log(`User ${document} has been updated`) 
    next()
})

const UserModel = mongoose.model('users', userSchema)
module.exports = UserModel
