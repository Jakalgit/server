const {OrderItem} = require('../models/models')

class orderItemController {

    async create(req, res) {
        const {orderId, name, price, img, count} = req.body

        const orderItem = await OrderItem.create({name, price, img, count, orderId})

        return res.json(orderItem)
    }

    async getOrderItem(req, res) {
        const {id} = req.query

        const orderItem = await OrderItem.findOne({where: {id}})
        if (orderItem) {
            return res.json(orderItem)
        } else {
            return res.json("Ошибка")
        }
    }

    async increment(req, res) {
        const {id} = req.body
        const item = await OrderItem.findOne({where: {id}})

        if (item && item.count < 99) {
            item.count = item.count + 1
            await item.save()
        }

        return res.json(item)
    }

    async decrement(req, res) {
        const {id} = req.body
        const item = await OrderItem.findOne({where: {id}})

        if (item && item.count > 1) {
            item.count = item.count - 1
            await item.save()
        }

        return res.json(item)
    }

    async getOrderItems(req, res) {
        const {orderId} = req.query

        if (orderId) {
            const orderItems = await OrderItem.findAndCountAll({where: {orderId}})
            return res.json(orderItems)
        } else {
            return res.json("Ошибка")
        }
    }

    async deleteOrderItem(req, res) {
        const {id} = req.body

        const orderItem = await OrderItem.findOne({where: {id}})
        if (orderItem) {
            await OrderItem.destroy({where: {id}})
            return res.json("Удалено")
        } else {
            return res.json("Ошибка")
        }
    }

    async deleteOrderItems(req, res) {
        const {orderId} = req.body

        const orderItems = await OrderItem.findAndCountAll({where: {orderId}})
        if (orderItems) {
            await OrderItem.destroy({where: {orderId}})
            return res.json("Удалено")
        } else {
            return res.json("Ошибка")
        }
    }

}

module.exports = new orderItemController()