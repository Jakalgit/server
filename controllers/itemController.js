const {Item} = require('../models/models')
const {Op} = require('sequelize');
const ApiError = require('../error/ApiError')

class itemController {
    async create(req, res, next) {
        try {
            let {name, price, oldPrice, discount, discountFlag, brandId, categoryId, categoryDownId, scaleId, length, width, height, weight, availability, visibility, new_item} = req.body

            const item = await Item.create({name, img: "", price, old_price: oldPrice, discount, discount_flag: discountFlag, brandId, categoryId,
                categoryDownId, scaleId, length, width, height, weight, availability, visibility, new_item, count_shop: '0'})

            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getPageAll(req, res) {
        try {
            let {categoryId, categoryDownId, brandId, scaleId, availability, visibility, discount_flag, page} = req.query
            page = page || 1
            discount_flag = discount_flag || null
            scaleId = scaleId || null
            let limit = 12
            let offset = page * limit - limit
            let items;
            let paramsList = []

            if (discount_flag) {
                paramsList.push({discount_flag})
            }

            if (scaleId) {
                paramsList.push({scaleId})
            }

            if (categoryId && categoryDownId && brandId) {
                paramsList.push([...paramsList, {categoryId}, {categoryDownId}, {availability}, {visibility}, {brandId}])
            }
            if (categoryId && !categoryDownId && brandId) {
                paramsList.push([...paramsList, {categoryId}, {brandId}, {availability}, {visibility}])
            }
            if (categoryId && categoryDownId && !brandId) {
                paramsList.push([...paramsList, {categoryId}, {categoryDownId}, {availability}, {visibility}])
            }
            if (!categoryId && !categoryDownId && brandId) {
                paramsList.push([...paramsList, {brandId}, {availability}, {visibility}])
            }
            if (categoryId && !categoryDownId && !brandId) {
                paramsList.push([...paramsList, {categoryId}, {availability}, {visibility}])
            }
            if (!categoryId && !categoryDownId && !brandId) {
                paramsList.push([...paramsList, {availability}, {visibility}])
            }

            items = await Item.findAndCountAll({where: {[Op.and]: paramsList}, limit, offset})


            return res.json(items)
        } catch (e) {
            console.log(e)
            return res.json({count: 0, rows: []})
        }
    }

    async getAll(req, res) {
        const items = await Item.findAll({where: {availability: true, visibility: true}})

        return res.json(items)
    }

    async getFullAll(req, res) {
        let items = await Item.findAll()

        return res.json(items)
    }

    async getOne(req, res) {
        try {
            const {id} = req.params
            const item = await Item.findOne(
                {
                    where: {id}
                }
            )

            return res.json(item)
        } catch (e) {
            console.log(e)
            return res.json({})
        }
    }

    async changeName(req, res) {
        try {
            const {name, id} = req.body
            const item = await Item.findOne({where: {id}})
            if (item && name) {
                item.name = name
                await item.save()
            }

            return res.json(name)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changePrice(req, res) {
        try {
            const {price, id} = req.body
            const item = await Item.findOne({where: {id}})
            if (item && price) {
                item.price = price
                await item.save()
            }

            return res.json(price)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeParams(req, res) {
        try {
            const {categoryId, downCategoryId, brandId, id} = req.body
            const item = await Item.findOne({where: {id}})
            if (item && categoryId && downCategoryId && brandId) {
                item.categoryId = categoryId
                item.categoryDownId = downCategoryId
                item.brandId = brandId
                await item.save()
            }


            return res.json({categoryId, downCategoryId, brandId})
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeAvailability(req, res) {
        try {
            const {availability, id} = req.body
            const item = await Item.findOne({where: {id}})
            if (availability !== null && item) {
                item.availability = availability
                await item.save()
            }

            return res.json(availability)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeVisibility(req, res) {
        try {
            const {visibility, id} = req.body
            const item = await Item.findOne({where: {id}})
            if (visibility !== null && item) {
                item.visibility = visibility
                await item.save()
            }

            return res.json(visibility)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeNew(req, res) {
        try {
            const {new_item, id} = req.body
            const item = await Item.findOne({where: {id}})
            if (new_item !== null && item) {
                item.new_item = new_item
                await item.save()
            }

            return res.json(new_item)
        } catch (e) {
            console.log(e)
            return res.json("Ошибка")
        }
    }

    async changeLength(req, res) {
        try {
            const {length, id} = req.body
            const item = await Item.findOne({where: {id}})
            if (length && item) {
                item.length = length
                await item.save()
            }

            return res.json(length)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeWidth(req, res) {
        try {
            const {width, id} = req.body
            const item = await Item.findOne({where: {id}})
            if (width && item) {
                item.width = width
                await item.save()
            }

            return res.json(width)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeHeight(req, res) {
        try {
            const {height, id} = req.body
            const item = await Item.findOne({where: {id}})
            if (height && item) {
                item.height = height
                await item.save()
            }

            return res.json(height)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeWeight(req, res) {
        try {
            const {weight, id} = req.body
            const item = await Item.findOne({where: {id}})
            if (weight && item) {
                item.weight = weight
                await item.save()
            }

            return res.json(weight)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeDiscountFlag(req, res) {
        try {
            const {discount_flag, id} = req.body

            const item = await Item.findOne({where: {id}})
            if (item) {
                item.discount_flag = discount_flag
                item.discount = ""
                item.old_price = ""
                await item.save()

                return res.json("Сохранено")
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Ошибка")
        }
    }

    async changeDiscount(req, res) {
        try {
            const {discount, discount_flag, old_price, id} = req.body

            const item = await Item.findOne({where: {id}})
            if (item && discount && old_price) {
                item.discount = discount
                item.discount_flag = discount_flag
                item.old_price = old_price
                await item.save()

                return res.json("Сохранено")
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Ошибка")
        }
    }

    async changeScale(req, res) {
        try {
            const {scaleId, id} = req.body

            const item = await Item.findOne({where: {id}})
            if (item && scaleId) {
                item.scaleId = scaleId
                await item.save()

                return res.json('Сохранено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

}

module.exports = new itemController()