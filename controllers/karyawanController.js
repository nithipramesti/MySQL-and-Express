const {db} = require('../database')

module.exports = {
    getData: (req,res) => {
        let scriptQuery = `Select * from karyawan` //script query in mysql
    
        //search query
        if(req.query.nama){
            scriptQuery = `Select * from karyawan where nama = ${db.escape(req.query.nama)}`
        }
    
    
        db.query(scriptQuery, (err,results) => {
            if(err) res.status(500).send(err) //error
            res.status(200).send(results) //result
        })
    }
}