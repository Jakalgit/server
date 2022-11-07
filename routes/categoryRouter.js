const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), categoryController.create)
router.post('/changename', checkRole('ADMIN'), categoryController.changeName)
router.post('/delete', categoryController.delete)
router.get('/', categoryController.getAll)

module.exports = router