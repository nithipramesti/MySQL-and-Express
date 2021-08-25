//IMPORT LIBRARIES
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const PORT = 3300
const app = express() //define express app

app.use(cors()) //define cors (middleware dari express)
app.use(express.json()) //read data body -- replace json.parse

//connect to mysql:
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Agustus-15', //PASSWORD
    database: 'db_kantor',
    port: 3306,
    multipleStatements: true
})

//checking
db.connect((err) => {
    if(err){
        return console.error(`error: ${err.message}`)
    }
    console.log(`Connected to MySQL server!`);
})

app.get('/', (req,res) => {
    res.status(200).send(`<h4>Integrated mysql with express</h4>`)
})

const { karyawanRouters } = require('./routers')

app.use('/karyawan', karyawanRouters)

//
//GET DATA 
// app.get('/karyawan', (req,res) => {
//     let scriptQuery = `Select * from karyawan` //script query in mysql

//     //search query
//     if(req.query.nama){
//         scriptQuery = `Select * from karyawan where nama = ${db.escape(req.query.nama)}`
//     }


//     db.query(scriptQuery, (err,results) => {
//         if(err) res.status(500).send(err) //error
//         res.status(200).send(results) //result
//     })
// })

//
//POST DATA TO MYSQL using req.query
app.post('/add-karyawan', (req,res)=>{
    console.log(req.body);
    let {nama, usia, email, berat, kota, tahun, idposisi }= req.body
    let insertQuery = `Insert into karyawan values (null,${db.escape(nama)}, ${db.escape(usia)}, ${db.escape(email)}, ${db.escape(berat)}, ${db.escape(kota)}, ${db.escape(tahun)}, ${db.escape(idposisi)} )` //script query in mysql
    console.log(insertQuery);

    db.query(insertQuery, (err,results)=>{
        if(err)res.status(500).send(err) //error

        db.query(`Select * from karyawan where nama = ${db.escape(nama)}`, (err2, results2) => {
            if(err2) res.status(500).send(err2)
            res.status(200).send({message: 'Berhasil menambah data karyawan',data: results2})
        })
    })
})

//PATCH DATA TO MYSQL using request paramss
app.patch('/edit-karyawan/:id', (req,res)=>{
    let patchData = [] 
    for (let prop in req.body){
        patchData.push(`${prop} = ${db.escape(req.body[prop])}`) //save data from req.body to an array
    }
    let editQuery = `update karyawan set ${patchData} where idkaryawan = ${db.escape(req.params.id)}`

    db.query(editQuery, (err,results) => {
        if(err) res.status(500).send(err) //error
        res.status(200).send(results) //result
    })

    // db.query(editQuery, (err,results) => {
    //     if(err)res.status(500).send(err)

    //     db.query(`Select * from karyawan where idkaryawan = ${db.escape(req.params.id)}`, (err2, results2) => {
    //         if(err2) res.status(500).send(err2)
    //         res.status(200).send({message: 'Berhasil edit data karyawan',data: results2})
    //     })
    // })
})

//DELETE DATA FROM MYSQL using request params
app.delete('/delete-karyawan/:idkaryawan', (req,res)=>{
    let deleteQuery = `delete from karyawan where idkaryawan = ${db.escape(req.params.idkaryawan)};`

    db.query(deleteQuery, (err,results) => {
        if(err) res.status(500).send(err) //error
        res.status(200).send(results) //result
    })
})

app.listen(PORT,()=>console.log('API running :', PORT))