const uuid = require('uuid')
const path = require('path')
const {Item} = require('../models/models')
const ApiError = require('../error/ApiError')

class itemController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, categoryId, categoryDownId, length, width, height, weight, availability, visibility} = req.body
            const {img_1, img_2, img_3, img_4} = req.files

            // 1ое изображение
            let fileName_1 = uuid.v4() + ".jpg"
            await img_1.mv(path.resolve(__dirname, '..', 'static', fileName_1))

            // 2ое изображение
            let fileName_2 = uuid.v4() + ".jpg"
            await img_2.mv(path.resolve(__dirname, '..', 'static', fileName_2))

            // 3ое изображение
            let fileName_3 = uuid.v4() + ".jpg"
            await img_3.mv(path.resolve(__dirname, '..', 'static', fileName_3))

            // 4ое изображение
            let fileName_4 = uuid.v4() + ".jpg"
            await img_4.mv(path.resolve(__dirname, '..', 'static', fileName_4))

            const item = await Item.create({name, price, brandId, categoryId,
                img1: fileName_1, img2: fileName_2, img3: fileName_3, img4: fileName_4, categoryDownId, length, width, height, weight, availability, visibility})

            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {categoryId, categoryDownId, brandId, availability, visibility, page} = req.query
        page = page || 1
        let limit = 12
        let offset = page * limit - limit
        let items;

        if (categoryId && categoryDownId && brandId) {
            items = await Item.findAndCountAll({where: {categoryId, categoryDownId, availability, visibility, brandId}, limit, offset})
        }
        if (categoryId && !categoryDownId && brandId) {
            items = await Item.findAndCountAll({where: {categoryId, brandId, availability, visibility}, limit, offset})
        }
        if (categoryId && categoryDownId && !brandId) {
            items = await Item.findAndCountAll({where: {categoryId, categoryDownId, availability, visibility}, limit, offset})
        }
        if (!categoryId && !categoryDownId && brandId) {
            items = await Item.findAndCountAll({where: {brandId, availability, visibility}, limit, offset})
        }
        if (categoryId && !categoryDownId && !brandId) {
            items = await Item.findAndCountAll({where: {categoryId, availability, visibility}, limit, offset})
        }
        if (!categoryId && !categoryDownId && !brandId) {
            items = await Item.findAndCountAll({where: {availability, visibility}, limit, offset})
        }


        return res.json(items)
    }

    async getFullAll(req, res) {
        let items = await Item.findAll()

        return res.json(items)
    }

    async getOne(req, res) {
        const {id} = req.params
        const item = await Item.findOne(
            {
                where: {id}
            }
        )

        return res.json(item)
    }

    async changeName(req, res) {
        const {name, id} = req.body
        const item = await Item.findOne({where: {id}})
        if (item && name) {
            item.name = name
            await item.save()
        }

        return res.json(item.name)
    }

    async changePrice(req, res) {
        const {price, id} = req.body
        const item = await Item.findOne({where: {id}})
        if (item && price) {
            item.price = price
            await item.save()
        }

        return res.json(price)
    }

    async changeParams(req, res) {
        const {categoryId, downCategoryId, brandId, id} = req.body
        const item = await Item.findOne({where: {id}})
        if (item && categoryId && downCategoryId && brandId) {
            item.categoryId = categoryId
            item.categoryDownId = downCategoryId
            item.brandId = brandId
            await item.save()
        }


        return res.json({categoryId, downCategoryId, brandId})
    }

    async changeAvailability(req, res) {
        const {availability, id} = req.body
        const item = await Item.findOne({where: {id}})
        if (availability !== null && item) {
            item.availability = availability
            await item.save()
        }

        return res.json(availability)
    }

    async changeVisibility(req, res) {
        const {visibility, id} = req.body
        const item = await Item.findOne({where: {id}})
        if (visibility !== null && item) {
            item.visibility = visibility
            await item.save()
        }

        return res.json(visibility)
    }

    async changeImg_1(req, res) {
        const {id} = req.body
        const {img1} = req.files
        const item = await Item.findOne({where: {id}})
        if (img1 && item) {
            let fileName_1 = uuid.v4() + ".jpg"
            await img1.mv(path.resolve(__dirname, '..', 'static', fileName_1))
            item.img1 = fileName_1
            await item.save()
        }

        return res.json(img1)
    }

    async changeImg_2(req, res) {
        const {id} = req.body
        const {img2} = req.files
        const item = await Item.findOne({where: {id}})
        if (img2 && item) {
            let fileName_2 = uuid.v4() + ".jpg"
            await img2.mv(path.resolve(__dirname, '..', 'static', fileName_2))
            item.img2 = fileName_2
            await item.save()
        }

        return res.json(img2)
    }

    async changeImg_3(req, res) {
        const {id} = req.body
        const {img3} = req.files
        const item = await Item.findOne({where: {id}})
        if (img3 && item) {
            let fileName_3 = uuid.v4() + ".jpg"
            await img3.mv(path.resolve(__dirname, '..', 'static', fileName_3))
            item.img3 = fileName_3
            await item.save()
        }

        return res.json(img3)
    }

    async changeImg_4(req, res) {
        const {id} = req.body
        const {img4} = req.files
        const item = await Item.findOne({where: {id}})
        if (img4 && item) {
            let fileName_4 = uuid.v4() + ".jpg"
            await img4.mv(path.resolve(__dirname, '..', 'static', fileName_4))
            item.img4 = fileName_4
            await item.save()
        }

        return res.json(img4)
    }

    async changeLength(req, res) {
        const {length, id} = req.body
        const item = await Item.findOne({where: {id}})
        if (length && item) {
            item.length = length
            await item.save()
        }

        return res.json(length)
    }

    async changeWidth(req, res) {
        const {width, id} = req.body
        const item = await Item.findOne({where: {id}})
        if (width && item) {
            item.width = width
            await item.save()
        }

        return res.json(width)
    }

    async changeHeight(req, res) {
        const {height, id} = req.body
        const item = await Item.findOne({where: {id}})
        if (height && item) {
            item.height = height
            await item.save()
        }

        return res.json(height)
    }

    async changeWeight(req, res) {
        const {weight, id} = req.body
        const item = await Item.findOne({where: {id}})
        if (weight && item) {
            item.weight = weight
            await item.save()
        }

        return res.json(weight)
    }
}

module.exports = new itemController()