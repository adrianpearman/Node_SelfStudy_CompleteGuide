// importing model functions
const Product = require('../models/product')
const Cart = require('../models/cart')

// GET REQUESTS
exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            path: '/',
            pageTitle: 'Shop',
            prods: products,
        })
    })
}

exports.getProducts = (req, res, next) => {
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
    // returns all of the values from the cart json file
    Cart.getCart(cart => {
        // grabbing the product information from the product file
        Product.fetchAll(products => {
            const cartProducts = []
            // iterates through file data
            for (product of products) {
                // returns the values that match the product file
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                )
                if(cartProductData){
                    cartProducts.push({ productData: product, quantity: cartProductData.quantity})
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'My Cart',
                products: cartProducts
            }) 
        })
    })

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
    Product.fetchByID(prodID, (product) => {
        Cart.addProduct(prodID, product.price)
    })
    res.redirect('/cart')
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.postCartDelete = (req, res, next) => {
    const prodID = req.body.productID
    Product.fetchByID(prodID, product => {
        Cart.deleteProduct(prodID, product.price)
        // console.log(prodID)
        res.redirect('/cart')
    })
}

