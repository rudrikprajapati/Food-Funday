const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phoneno: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: true
    },
    role_id: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref:'Role'
    }
})

module.exports = mongoose.model('Users', UserSchema)