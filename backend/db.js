const mysql2 = require('mysql2')

const db = mysql2.createConnection(
    {
        host:'mysql',
        user:'root',
        password:'1234',
        database:'pretest10',
        timezone:"+07:00",
        dateStrings:true,
    }
)

module.exports = db.promise()