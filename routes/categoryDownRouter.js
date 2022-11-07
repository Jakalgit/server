const Router = require('express')
const router = new Router()
const categoryDownController = require('../controllers/categoryDownController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), categoryDownController.create)
router.post('/changename', checkRole('ADMIN'), categoryDownController.changeName)
router.post('/delete', checkRole('ADMIN'), categoryDownController.delete)
router.get('/', categoryDownController.getAll)

module.exports = router