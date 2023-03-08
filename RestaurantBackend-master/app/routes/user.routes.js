const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller')

router.post('/add', controller.addUser)
router.get('/get', controller.getUser)
router.get('/getById/:userId', controller.getUserById)
router.put('/update/:userId', controller.updateUser)
router.delete('/delete/:userId', controller.deleteUser)
router.post('/login', controller.login)

module.exports = router