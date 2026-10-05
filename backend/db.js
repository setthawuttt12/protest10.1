const mysql2 = require('mysql2')

const db = mysql2.createPool(
    {
        host:'mysql',
        user:'root',
        password:'1234',
        port:'3306',
        database:'protest10'
    }
)

module.exports = db.promise()