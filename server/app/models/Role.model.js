const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    role_name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Role', RoleSchema)