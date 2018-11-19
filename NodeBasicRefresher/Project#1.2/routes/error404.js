const express = require('express')
const router = express.Router()
const productsController = require('../controllers/product')

router.use(productsController.error404) 

module.exports = router