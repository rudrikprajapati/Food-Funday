const express = require('express')
const router = express.Router()

const controller = require('../controllers/orderfood.controller')

router.post('/add', controller.addFoodOrder)
router.get('/get', controller.getFoodOrder)
router.get('/getById/:foodorderId', controller.getFoodOrderById)
router.get('/getByUserId/:userId', orderController.getOrdersByUserId);
router.put('/update/:foodorderId', controller.updateFoodOrder)
router.delete('/delete/:foodorderId', controller.deleteFoodOrder)

module.exports = router