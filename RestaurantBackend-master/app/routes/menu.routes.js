const express = require('express')
const router = express.Router()

const controller = require('../controllers/menu.controller')

router.post('/add', controller.addMenu)
router.get('/get', controller.getMenu)
router.get('/getById/:menuId', controller.getMenuById)
router.put('/update/:menuId', controller.updateMenu)
router.delete('/delete/:menuId', controller.deleteMenu)

module.exports = router