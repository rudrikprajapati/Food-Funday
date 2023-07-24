//responses
const responses = require('../utils/responses')

//model
const BookTable = require('../models/BookTable.model')

//add book table
exports.addBookTable = async (req, res) => {
    try {
        const bookTable = new BookTable(req.body)
        const saveBookTable = await bookTable.save()

        //send response 
        return responses.successfullyCreatedResponse(
            res,
            saveBookTable,
            "Successfully added book table..."
        )
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

//get book table
exports.getBookTable = async (req, res) => {
    try {
        const bookTable = await BookTable.find()
            .populate({ path: 'status_id', select: ['status_name'] })
            .populate({ path: 'user_id' })

        //send response 
        return responses.successResponse(
            res,
            bookTable,
            "Book table data..."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...")
    }
}

exports.getBookTableByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find reservations by user ID and populate related fields
        const bookTable = await BookTable.find({ user_id: userId })
            .populate({ path: 'status_id', select: ['status_name'] })
            .populate({ path: 'user_id' });

        // Check if any data was found for the user
        if (bookTable.length === 0) {
            return responses.notFoundResponse(res, "No booked tables found for the user.");
        }

        // Send response
        return responses.successResponse(
            res,
            bookTable,
            "Booked table data for the user."
        );
    } catch (error) {
        console.log(error);
        responses.serverErrorResponse(res, "Server Error...");
    }
};



//get particular book table
exports.getBookTableById = async (req, res) => {
    try {
        const getBookingById = await BookTable.findById(req.params.bookTableId)
            .populate({ path: 'status_id', select: ['status_name'] })

        //send response 
        return responses.successResponse(
            res,
            getBookingById,
            "Food data..."
        );
    } catch (error) {
        res.json({ msg: error })
    }
}

//update book table
exports.updateBookTable = async (req, res) => {
    try {
        const updateBookTable = await BookTable.findByIdAndUpdate(req.params.bookTableId, req.body)
        return responses.successfullyCreatedResponse(
            res,
            updateBookTable,
            "Successfully updated book table..."
        );
    } catch (error) {
        res.json({ msg: error })
    }
}

exports.deleteBookTable = async (req, res) => {
    try {
        const deleteBookTable = await BookTable.remove({ _id: req.params.bookTableId })
        return responses.successfullyCreatedResponse(
            res,
            deleteBookTable,
            "Successfully deleted book table..."
        );
    } catch (error) {
        res.json({ msg: error })
    }
}