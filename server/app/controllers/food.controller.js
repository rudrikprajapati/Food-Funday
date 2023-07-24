//responses
const responses = require('../utils/responses')

//model
const Food = require('../models/Food.model')

//add food
exports.addFood = async (req, res) => {
    try {
        const food = new Food(req.body)
        const saveFood = await food.save()

        //send response 
        return responses.successfullyCreatedResponse(
            res,
            saveFood,
            "Successfully added food..."
        )
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

//get food
exports.getFood = async (req, res) => {
    try {
        const food = await Food.find()
            .populate({ path: 'status_id', select: ['status_name'] })
            .populate({ path: 'menu_id', select: ['menu_name'] })

        //send response 
        return responses.successResponse(
            res,
            food,
            "Food data..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

//get particular food
exports.getFoodById = async (req, res) => {
    try {
        const getFoodById = await Food.findById(req.params.foodId)
            .populate({ path: 'status_id', select: ['status_name'] })
            .populate({ path: 'menu_id', select: ['menu_name'] })

        //send response 
        return responses.successResponse(
            res,
            getFoodById,
            "Food data..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

//update food
exports.updateFood = async (req, res) => {
    try {
        const updateFood = await Food.findByIdAndUpdate(req.params.foodId, req.body)

        //send response 
        return responses.successfullyCreatedResponse(
            res,
            updateFood,
            "Successfully updated food..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

//delete food
exports.deleteFood = async (req, res) => {
    try {
        const deleteFood = await Food.remove({ _id: req.params.foodId })

        //send response 
        return responses.successfullyCreatedResponse(
            res,
            deleteFood,
            "Successfully deleted food..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}