const mongoose = require('mongoose')

const MenuSchema = mongoose.Schema({
    menu_name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Menu', MenuSchema)