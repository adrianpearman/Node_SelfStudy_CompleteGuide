const express = require('express')
const router = express.Router()
const adminControlller = require('../controllers/admin')

// GET REQUESTS
router.get('/add-product', adminControlller.getAddProduct)
router.get('/edit-product/:productID', adminControlller.getEditProduct)
router.get('/products', adminControlller.getProductsList)

// POST REQUESTS
router.post('/add-product', adminControlller.postAddProduct)
router.post('/edit-product', adminControlller.postEditProduct)

// DELETE REQUESTS
router.post('/delete-product', adminControlller.postDeleteProduct)
module.exports = router
