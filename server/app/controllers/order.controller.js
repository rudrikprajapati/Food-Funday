//responses
const responses = require('../utils/responses')

//model
const Order = require('../models/Order.model')

exports.addOrder = async (req, res) => {
    try {
        const order = new Order(req.body)
        const saveOrder = await order.save()

        //send response 
        return responses.successfullyCreatedResponse(
            res,
            saveOrder,
            "Successfully added order..."
        )
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.find()
            .populate({ path: 'status_id', select: ['status_name'] })
            .populate({ path: 'user_id', select: ['firstName', 'lastName'] })

        //send response 
        return responses.successResponse(
            res,
            order,
            "Order data..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const getOrderById = await Order.findById(req.params.orderId)
            .populate({ path: 'status_id', select: ['status_name'] })
            .populate({ path: 'user_id', select: ['firstName', 'lastName'] })

        //send response 
        return responses.successResponse(
            res,
            getOrderById,
            "Order data..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body)

        //send response 
        return responses.successfullyCreatedResponse(
            res,
            updateOrder,
            "Successfully updated order..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const deleteOrder = await Order.remove({ _id: req.params.orderId })

        //send response 
        return responses.successfullyCreatedResponse(
            res,
            deleteOrder,
            "Successfully deleted order..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}