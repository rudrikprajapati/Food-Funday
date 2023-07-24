const Status = require('../models/Status.model')

exports.addStatus = async (req, res) => {
    try {
        const status = new Status(req.body)
        const saveStatus = await status.save()
        res.json(saveStatus)
    }
    catch (error){
        res.json({msg: error})
    }
}

exports.getStatus = async (req, res) => {
    try{
        const status = await Status.find()
        res.json(status)
    }
    catch (error){
        res.json({msg: error})
    }
}

exports.getStatusById = async (req, res) => {
    try{
        const getStatusById = await Status.findById(req.params.statusId)
        res.json(getStatusById)
    }
    catch (error){
        res.json({msg: error})
    }
}

exports.updateStatus = async(req, res) => {
    try{
        const updateStatus = await Status.findByIdAndUpdate(req.params.statusId, req.body)
        res.json(updateStatus)
    }
    catch(error){
        res.json({msg: error})
    }
}

exports.deleteStatus = async(req, res) => {
    try{
        const deleteStatus = await Status.remove({ _id: req.params.statusId})
        res.json(deleteStatus)
    }
    catch(error){
        res.json({msg: error})
    }
}

