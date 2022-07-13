const {BasketItem} = require("../models/models")

class basketItemController {
    async create(req, res) {
        try {
            const {itemId, basketId, count} = req.body
            let basketItem = await BasketItem.findOne({where: {itemId, basketId}})
            if (!basketItem) {
                basketItem = await BasketItem.create({itemId, basketId, count})
            }

            return res.json(basketItem)
        } catch (e) {
            return res.json(e)
        }
    }

    async increment(req, res) {
        try {
            const {itemId, basketId} = req.body
            let basketItem = await BasketItem.findOne({where: {itemId, basketId}})
            if (basketItem && basketItem.count <= 99) {
                basketItem.count = basketItem.count + 1
                await basketItem.save()
            }

            return res.json(basketItem)
        } catch (e) {
            return res.json(e)
        }
    }

    async decrement(req, res) {
        try {
            const {itemId, basketId} = req.body
            let basketItem = await BasketItem.findOne({where: {itemId, basketId}})
            if (basketItem && basketItem.count >= 1) {
                basketItem.count = basketItem.count - 1
                await basketItem.save()
            }

            return res.json(basketItem)
        } catch (e) {
            return res.json(e)
        }
    }

    async deleteOne(req, res) {
        try {
            const {itemId, basketId} = req.body
            const basketItem = await BasketItem.findOne({where: {itemId, basketId}})
            if (basketItem) {
                await basketItem.destroy()
            }

            return res.json()
        } catch (e) {
            return res.json(e)
        }
    }

    async deleteAll(req, res) {
        try {
            const {basketId} = req.body
            const basketItems = await BasketItem.findAndCountAll({where: {basketId}})
            if (basketItems) {
                await BasketItem.destroy({where: {basketId}})
            }

            return res.json()
        } catch (e) {
            return res.json(e)
        }
    }

    async getAll(req, res) {
        try {
            const {basketId} = req.query
            const basketItems = await BasketItem.findAndCountAll({where: {basketId}})

            return res.json(basketItems)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new basketItemController()