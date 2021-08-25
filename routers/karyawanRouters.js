const express = require('express')
const { karyawanController } = require('../controllers')
const routers = express.Router() //router is an object?

routers.get('/get', karyawanController.getData)

module.exports = routers