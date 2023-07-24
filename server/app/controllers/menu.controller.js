//responses
const responses = require('../utils/responses')

//model
const Menu = require('../models/Menu.model')

exports.addMenu = async (req, res) => {
    try {
        const menu = new Menu(req.body)
        const saveMenu = await menu.save()

        //send response 
        return responses.successfullyCreatedResponse(
            res,
            saveMenu,
            "Successfully added menu..."
        )
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find()

        //send response 
        return responses.successResponse(
            res,
            menu,
            "Menu data..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    } F
}

exports.getMenuById = async (req, res) => {
    try {
        const getMenuById = await Menu.findById(req.params.menuId)

        //send response 
        return responses.successResponse(
            res,
            getMenuById,
            "Menu data..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

exports.updateMenu = async (req, res) => {
    try {
        const updateMenu = await Menu.findByIdAndUpdate(req.params.menuId, req.body)

        //send response 
        return responses.successfullyCreatedResponse(
            res,
            updateMenu,
            "Successfully updated menu..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

exports.deleteMenu = async (req, res) => {
    try {
        const deleteMenu = await Menu.remove({ _id: req.params.menuId })
        
        //send response 
        return responses.successfullyCreatedResponse(
            res,
            deleteMenu,
            "Successfully deleted menu..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}