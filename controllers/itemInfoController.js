const {ItemInfo} = require("../models/models")
const ApiError = require("../error/ApiError");

class itemInfoController {
    async create(req, res, next) {
        try {
            let {info, itemId} = req.body

            if (info) {
                const itemInfo = await ItemInfo.create({info, itemId})

                return res.json(itemInfo)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {itemId} = req.query

        const info = await ItemInfo.findAndCountAll({where: {itemId}})

        return res.json(info)
    }

    async changeInfo(req, res) {
        const {info, id} = req.body
        const itemInfo = await ItemInfo.findOne({where: {id}})
        if (itemInfo && info) {
            itemInfo.info = info
            await itemInfo.save()
        }

        return res.json(info)
    }

    async deleteInfo(req, res) {
        let {id} = req.body

        const info = await ItemInfo.findOne({where: {id}})
        if (info) {
            await ItemInfo.destroy({where: {id}})
        }

        return res.json()
    }
}

module.exports = new itemInfoController()