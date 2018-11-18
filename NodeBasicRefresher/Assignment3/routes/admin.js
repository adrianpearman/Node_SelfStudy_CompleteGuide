const express = require('express')
const path = require('path')
const router = express.Router()
const rootDir = require('../utils/path')
const addProductFileLocation = path.join(rootDir, "views", "addProduct.html")

router.get('/add-product', (req, res, next) => {
    res.sendFile( addProductFileLocation )
})

router.post('/add-product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/')
})

router.get('/users', (req, res, next) => {
    res.send("<h1>Hello from the '/users' route </h1>")
})

module.exports = router