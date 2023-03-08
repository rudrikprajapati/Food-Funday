const express = require('express')
const router = express.Router()

const controller = require('../controllers/status.controller')

router.post('/add', controller.addStatus)
router.get('/get', controller.getStatus)
router.get('/getById/:statusId', controller.getStatusById)
router.put('/update/:statusId', controller.updateStatus)
router.delete('/delete/:statusId', controller.deleteStatus)

module.exports = router