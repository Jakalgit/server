require('dotenv').config()
const express = require('express')
const sequelize = require('./database')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser('secret key'))
app.use(fileUpload({}))
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Server started on port ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()