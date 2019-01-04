const express = require('express')
const router = express.Router()

const shopController = require('../controllers/shop')

// GET REQUESTS
router.get('/', shopController.getIndex)
router.get('/products', shopController.getProducts)
router.get('/products/:productID', shopController.getProduct)
router.get('/cart', shopController.getCart)
router.get('/checkout', shopController.getCheckout)
router.get('/orders', shopController.getOrders)

//POST REQUESTS
router.post('/cart', shopController.postCart)
router.post('/cart-delete-item', shopController.postCartDelete)
router.post('/create-order', shopController.postOrder)

module.exports = router