const express = require('express')
const router = express.Router()

const controller = require('../controllers/food.controller')

router.post('/add', controller.addFood)
router.get('/get', controller.getFood)
router.get('/getById/:foodId', controller.getFoodById)
router.put('/update/:foodId', controller.updateFood)
router.delete('/delete/:foodId', controller.deleteFood)

module.exports = router