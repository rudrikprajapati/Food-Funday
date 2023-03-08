const mongoose = require('mongoose')

const BookTableSchema = mongoose.Schema({
    booking_date: {
        type: String,
        require: true
    },
    booking_time: {
        type: String,
        require: true
    },
    approx_arrive_time: {
        type: String,
        require: true
    },
    no_of_persons: {
        type: Number,
        require: true
    },
    comments: {
        type: String,
        require: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref:'Users'
    },
    status_id: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref:'Status'
    }
})

module.exports = mongoose.model('Booktable', BookTableSchema)