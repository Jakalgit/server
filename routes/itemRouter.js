const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), itemController.create)
router.post('/changename', checkRole('ADMIN'), itemController.changeName)
router.post('/changeprice', checkRole('ADMIN'), itemController.changePrice)
router.post('/changeparams', checkRole('ADMIN'), itemController.changeParams)
router.post('/changeavailability', checkRole('ADMIN'), itemController.changeAvailability)
router.post('/changevisibility', checkRole('ADMIN'), itemController.changeVisibility)
router.post('/changeimg1', checkRole('ADMIN'), itemController.changeImg_1)
router.post('/changeimg2', checkRole('ADMIN'), itemController.changeImg_2)
router.post('/changeimg3', checkRole('ADMIN'), itemController.changeImg_3)
router.post('/changeimg4', checkRole('ADMIN'), itemController.changeImg_4)
router.post('/changelength', checkRole('ADMIN'), itemController.changeLength)
router.post('/changewidth', checkRole('ADMIN'), itemController.changeWidth)
router.post('/changeheight', checkRole('ADMIN'), itemController.changeHeight)
router.post('/changeweight', checkRole('ADMIN'), itemController.changeWeight)
router.get('/all', checkRole('ADMIN'), itemController.getFullAll)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)

module.exports = router