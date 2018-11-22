// importing model functions
const Product = require('../models/product')
const Cart = require('../models/cart')

// GET REQUESTS
exports.getIndex = (req, res, next) => {
    Product.findAll()
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
    Product.findAll()
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
            console.log(product)
            res.render('shop/product-detail', {
                path: '/products',
                pageTitle: `Product: ${product.title}`,
                product: product
            })
        })
        .catch(err => console.log(err))
    // Alternative approach
    // Product.findAll({ where: {id: prodID}})
    //     .then(products => {
    //         let product = products[0]
    //         console.log(product)
    //         res.render('shop/product-detail', {
    //             path: '/products',
    //             pageTitle: `Product: ${product.title}`,
    //             product: product
    //         })
    //     })
    //     .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(cartProducts => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'My Cart',
                        products: cartProducts
                    })
                })
                .catch(err => console.log(error))
        })
        .catch(err => console.log(error))
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Orders',
    })
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
    let fetchedCart        
    let newQuantity = 1
   req.user.getCart()
    .then(cart => {
        fetchedCart = cart
        return cart.getProducts({ where: {id: prodID}})
    })
    .then(products => {
        let product
        if (products.length > 0) {
            product = products[0]
        }

        if (product) {
            const oldQuantity = product.cartItem.quantity
            newQuantity = oldQuantity + 1
            return product
        }
        return Product.findById(prodID)
    })
    .then((product) => {
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity }
        })
    })
    .then(() => {
        return res.redirect('/cart')
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
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({ where: { id: prodID}})
    })
    .then(products => {
        const product = products[0]
        return product.cartItem.destroy()
    })
    .then(result => {
        return res.redirect('/cart')
    })
    .catch(err => {
        console.log(err)
    })
}

