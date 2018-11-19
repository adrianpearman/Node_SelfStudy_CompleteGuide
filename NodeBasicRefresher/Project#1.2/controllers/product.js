const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    // res.sendFile( addProductFileLocation )
    res.render('addProduct', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    // rendering a static html page
    // res.sendFile( shopFileLocation )
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products,
            path: '/',
            pageTitle: 'Shop',
            hasProducts: products.length > 0,
            activeShop: true
        })
        console.log(products)
    })


}
