const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'dennfq98l9suh3', // Название БД
    'kkyytdfutausgt', // Пользователь
    '8848608564a18e2e7eda0bebbbfc8003bc455280c5bac1d65479cd8b8744f7f8', // Пароль
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        host: 'ec2-34-235-198-25.compute-1.amazonaws.com',
        port: '5432',
    },
)