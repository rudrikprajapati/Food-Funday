const express = require('express')
const router = express.Router()

const controller = require('../controllers/order.controller')

router.post('/add', controller.addOrder)
router.get('/get', controller.getOrder)
router.get('/getById/:orderId', controller.getOrderById)
router.put('/update/:orderId', controller.updateOrder)
router.delete('/delete/:orderId', controller.deleteOrder)

module.exports = router