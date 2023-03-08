const express = require('express')
const router = express.Router()

const controller = require('../controllers/role.controller')

router.post('/add', controller.addRole)
router.get('/get', controller.getRole)
router.get('/getById/:roleId', controller.getRoleById)
router.put('/update/:roleId', controller.updateRole)
router.delete('/delete/:roleId', controller.deleteRole)

module.exports = router