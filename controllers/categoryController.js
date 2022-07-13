const {Category, Item, CategoryDown} = require('../models/models')
const ApiError = require('../error/ApiError')

class categoryController {
    async create(req, res) {
        try {
            const {name} = req.body
            const catCond = await Category.findOne({where: {name}})
            let category
            if (!catCond) {
                category = await Category.create({name})
            }
            return res.json(category)
        } catch (e) {
            
        }
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async changeName(req, res) {
        try {
            const {name, id} = req.body
            const category = await Category.findOne({where: {id}})
            if (category) {
                category.name = name
                await category.save()
            }

            return res.json(name)
        } catch (e) {
            
        }
    }

    async delete(req, res) {
        const {id} = req.body
        try {
            const category = await Category.findOne({where: {id}})
            const items = await Item.findAll({where: {categoryId: id}})
            const downCategories = await CategoryDown.findAll({where: {categoryId: id}})
            if (category && items.length === 0 && downCategories.length === 0) {
                await Category.destroy({where: {id}})
                return res.json("Удалено")
            } else {
                return res.json("Ошбика")
            }
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new categoryController()