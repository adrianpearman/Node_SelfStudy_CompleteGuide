const Product = require('../models/product')
const Cart = require('../models/cart')

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            path: '/',
            pageTitle: 'Shop',
            prods: products,
        })
        // console.log(products)
    })
}

exports.getProducts = (req, res, next) => {
    // rendering a static html page
    // res.sendFile( shopFileLocation )
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            path: '/products',
            pageTitle: 'Shop',
            prods: products,
        })
    })
}

exports.getProduct = (req, res, next) => {
    const prodID = req.params.productID
    Product.fetchByID(prodID, product => {
        console.log(product)
        res.render('shop/product-detail',{
            path: '/products',
            pageTitle: `Product: ${product.title}`,
            product: product
        })
    })

}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'My Cart',
    })
}

exports.postCart = (req, res, next) => {
    const prodID = req.body.productID
    Product.fetchByID(prodID, (product) => {
        Cart.addProduct(prodID, product.price)
    })
    res.redirect('/cart')
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

