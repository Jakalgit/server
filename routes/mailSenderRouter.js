const Router = require('express')
const router = new Router()
const checkRole = require("../middleware/checkRoleMiddleware")
const mailSender = require('../emailSender/emailSender')

router.post('/', checkRole('ADMIN'), mailSender.send)

module.exports = router