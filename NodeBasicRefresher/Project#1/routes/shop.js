const express = require('express')
const path = require('path')
const router = express.Router()
const rootDir = require("../utils/path")
const adminData = require('./admin')
const shopFileLocation = path.join( rootDir, "views", "shop.html" )

router.get('/', (req, res, next) => {
    const products = adminData.products
    // rendering a static html page
    // res.sendFile( shopFileLocation )

    // syntax for sending information to a template file
    res.render('shop', {   
        prods: products, 
        path: '/', 
        pageTitle: 'Shop', 
        hasProducts: products.length > 0,
        activeShop: true
    })
    console.log(adminData.products)
})

module.exports = router