const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
    food_name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    photo: {
        type: String
        // require: true
    },
    menu_id: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Menu'
    },
    status_id: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Status'
    }
})

module.exports = mongoose.model('Food', FoodSchema)