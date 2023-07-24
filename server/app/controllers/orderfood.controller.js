//responses
const responses = require('../utils/responses')

//model
const FoodOrder = require('../models/OrderFood.model')

exports.addFoodOrder = async (req, res) => {
    try {
        const foodorder = new FoodOrder(req.body)
        const saveFoodOrder = await foodorder.save()

        //send response 
        return responses.successfullyCreatedResponse(
            res,
            saveFoodOrder,
            "Successfully added order food..."
        )
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

exports.getFoodOrder = async (req, res) => {
    try {
        const foodorder = await FoodOrder.find()
            .populate({ path: 'order_id', select: ['status_name'] })
            .populate({ path: 'food_id', select: ['food_name'] })

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



exports.getFoodOrderById = async (req, res) => {
    try {
        const getFoodOrderById = await FoodOrder.findById(req.params.foodorderId)
        res.json(getFoodOrderById)
    } catch (error) {
        res.json({ msg: error })
    }
}

exports.updateFoodOrder = async (req, res) => {
    try {
        const updateFoodOrder = await FoodOrder.findByIdAndUpdate(req.params.foodorderId, req.body)
        res.json(updateFoodOrder)
    } catch (error) {
        res.json({ msg: error })
    }
}

exports.deleteFoodOrder = async (req, res) => {
    try {
        const deleteFoodOrder = await FoodOrder.remove({ _id: req.params.foodorderId })
        res.json(deleteFoodOrder)
    } catch (error) {
        res.json({ msg: error })
    }
}