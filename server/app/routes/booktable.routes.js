const express = require('express')
const router = express.Router()

const controller = require('../controllers/booktable.controller')

router.post('/add', controller.addBookTable)
router.get('/get', controller.getBookTable)
router.get('/getById/:bookTableId', controller.getBookTableById)
router.put('/update/:bookTableId', controller.updateBookTable)
router.delete('/delete/:bookTableId', controller.deleteBookTable)

module.exports = router