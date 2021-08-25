const mysql = require('mysql')

//connect to mysql:
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Agustus-15', //PASSWORD
    database: 'db_kantor',
    port: 3306,
    multipleStatements: true
})

//checking connection to database
db.connect((err) => {
    if(err){
        return console.error(`error: ${err.message}`)
    }
    console.log(`Connected to MySQL server!`);
})


module.exports = {db}