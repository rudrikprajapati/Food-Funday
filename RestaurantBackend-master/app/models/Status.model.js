const mongoose = require('mongoose')

const StatusSchema = mongoose.Schema({
    status_name :{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Status', StatusSchema)