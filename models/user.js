const { Schema , model} = require('mongoose')

const userSchema = new Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    profileImg:{
        type: String,
        default: '/images/user-avatar.png'
    },
    role:{
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
},{timestamps: true})

const User = model('user', userSchema)

module.exports = User
