const mongoose = require('mongoose')

const OrderFoodSchema = mongoose.Schema({
    order_id: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref:'Order'
    },
    food_id: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref:'Food'
    },
    qty: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Orderfood', OrderFoodSchema)