// importing model functions
const Product = require('../models/product')
const Order = require('../models/order')

// GET REQUESTS
exports.getIndex = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.render('shop/index', {
                path: '/',
                pageTitle: 'Shop',
                prods: products,
            })
        })
        .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.render('shop/product-list', {
                path: '/products',
                pageTitle: 'Shop',
                prods: products,
            })
        })
        .catch(err => console.log(err))   
}

exports.getProduct = (req, res, next) => {
    const prodID = req.params.productID
    Product.findById(prodID)
        .then((product) => {
            // console.log(product)
            res.render('shop/product-detail', {
                path: '/products',
                pageTitle: `Product: ${product.title}`,
                product: product
            })
        })
        .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productID')
        .execPopulate()
        .then(user => {
            const products = user.cart.items
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'My Cart',
                products: products
            })
        })
        .catch(error => console.log(error))
}

exports.getOrders = (req, res, next) => {
    Order.find({'user.userID': req.user._id})
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Orders',
                orders: orders
            })
        })
        .catch(err => console.log(err))

}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    })
}

// POST REQUESTS
exports.postCart = (req, res, next) => {
    const prodID = req.body.productID
    Product.findById(prodID)
        .then(product => {
            // console.log(req.user.addToCart(product))
            return req.user.addToCart(product)
        })
        .then(result => {
            res.redirect('/cart')
            // console.log(result)
        })
        .catch(err => console.log(err))
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.postCartDelete = (req, res, next) => {
    const prodID = req.body.productID
    req.user.deleteItemFromCart(prodID)
    .then(result => {
        return res.redirect('/cart')
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productID')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { 
                    quantity: i.quantity, 
                    productData: { ...i.productID._doc }
                }
            })
            const order = new Order({
                user: {
                    name: req.user.name,
                    userID: req.user
                },
                products: products
            })
            return order.save()
        })
        .then(() => {
            return req.user.clearCart()
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}
