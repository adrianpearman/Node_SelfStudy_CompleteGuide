const express = require('express')
const router = express.Router()
const adminControlller = require('../controllers/admin')

// GET REQUESTS
router.get('/add-product', adminControlller.getAddProduct)
router.get('/products', adminControlller.getProductsList)

// POST REQUESTS
router.post('/add-product', adminControlller.postAddProduct)

module.exports = router
