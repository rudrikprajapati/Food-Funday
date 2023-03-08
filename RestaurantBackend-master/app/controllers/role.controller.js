const Role = require('../models/Role.model')

exports.addRole = async (req, res) => {
    try {
        const role = new Role(req.body)
        const saveRole = await role.save()
        res.json(saveRole)
    }
    catch (error){
        res.json({msg: error})
    }
}

exports.getRole = async (req, res) => {
    try{
        const role = await Role.find()
        res.json(role)
    }
    catch (error){
        res.json({msg: error})
    }
}

exports.getRoleById = async (req, res) => {
    try{
        const getRoleById = await Role.findById(req.params.roleId)
        res.json(getRoleById)
    }
    catch (error){
        res.json({msg: error})
    }
}

exports.updateRole = async(req, res) => {
    try{
        const updateRole = await Role.findByIdAndUpdate(req.params.roleId, req.body)
        res.json(updateRole)
    }
    catch(error){
        res.json({msg: error})
    }
}

exports.deleteRole = async(req, res) => {
    try{
        const deleteRole = await Role.remove({ _id: req.params.roleId})
        res.json(deleteRole)
    }
    catch(error){
        res.json({msg: error})
    }
}