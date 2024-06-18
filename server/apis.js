const express = require('express')
const auth = require('../middleware/tokenVer')
const cors = require('cors')
module.exports = function (app) {
    app.use(cors())
    app.use(express.static('public'))
    app.use(express.json())
    app.use('/api/user' , require('../router/registers'))
    app.use('/api/user' , require('../router/login'))
    app.use('/api/product' , require('../router/createProd'))
}