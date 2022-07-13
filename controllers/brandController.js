const {Brand, Item} = require('../models/models')
const ApiError = require('../error/ApiError')

class brandController {
    async create(req, res) {
        try {
            const {name} = req.body
            const brandCond = await Brand.findOne({where: {name}})
            let brand
            if (!brandCond) {
                brand = await Brand.create({name})
            }
            return res.json(brand)
        } catch (e) {
            
        }
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async changeName(req, res) {
        try {
            const {name, id} = req.body
            const brand = await Brand.findOne({where: {id}})
            if (brand) {
                brand.name = name
                await brand.save()
            }

            return res.json(name)
        } catch (e) {
            
        }
    }

    async delete(req, res) {
        const {id} = req.body
        const brand = await Brand.findOne({where: {id}})
        const items = await Item.findAll({where: {brandId: id}})
        if (brand && items.length === 0) {
            await Brand.destroy({where: {id}})
            return res.json("Удалено")
        } else {
            return res.json("Ошибка")
        }
    }
}

module.exports = new brandController()