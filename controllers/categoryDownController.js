const {CategoryDown, Item} = require('../models/models')
const ApiError = require("../error/ApiError");

class categoryDownController {
    async create(req, res, next) {
        try {
            const {name, categoryId} = req.body
            const downCond = await CategoryDown.findOne({where: {name}})
            let categoryDown
            if (!downCond) {
                categoryDown = await CategoryDown.create({name, categoryId})
            }
            return res.json(categoryDown)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const categoriesDown = await CategoryDown.findAll()
        return res.json(categoriesDown)
    }

    async changeName(req, res) {
        try {
            const {name, id} = req.body
            const categoryDown = await CategoryDown.findOne({where: {id}})
            if (categoryDown) {
                categoryDown.name = name
                await categoryDown.save()
            }

            return res.json(name)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.body
            const downCategory = await CategoryDown.findOne({where: {id}})
            const items = await Item.findAll({where: {categoryDownId: id}})
            if (downCategory && items.length === 0) {
                await CategoryDown.destroy({where: {id}})
                return res.json('Удалено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }
}

module.exports = new categoryDownController()