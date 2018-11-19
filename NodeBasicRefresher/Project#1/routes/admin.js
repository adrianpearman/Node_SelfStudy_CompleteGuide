const express = require('express')
const path = require('path')
const router = express.Router()
const rootDir = require('../utils/path')
const addProductFileLocation = path.join(rootDir, "views", "addProduct.html")

const products = []

router.get('/add-product', (req, res, next) => {
    // res.sendFile( addProductFileLocation )
    res.render('addProduct', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        activeAddProduct: true
    })
})

router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title })
    res.redirect('/')
})

router.get('/users', (req, res, next) => {
    res.send("<h1>Hello from the '/users' route </h1>")
})

exports.routes = router
exports.products = products
