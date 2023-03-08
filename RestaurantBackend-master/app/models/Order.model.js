const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    timestamp: {
        type: Date,
        require:true
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:'Users'
    },
    comments:{
        type:String,
        require:true
    },
    status_id:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:'Status'
    }
})

module.exports = mongoose.model('Order', OrderSchema)