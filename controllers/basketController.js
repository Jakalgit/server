const {Basket} = require('../models/models')

class basketController {
    async create(req, res) {
        try {
            const {userId} = req.body
            let basket = await Basket.findOne({where: {userId}})

            if (!basket) {
                basket = await Basket.create({userId})
            }

            return res.json(basket)
        } catch (e) {
            return res.json(e)
        }
    }

    async getOne(req, res) {
        const {id} = req.params

        try {
            const basket = await Basket.findOne({where: {userId: id}})

            return res.json(basket)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new basketController()