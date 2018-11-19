const products = []

exports.getAddProduct = (req, res, next) => {
    // res.sendFile( addProductFileLocation )
    res.render('addProduct', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title })
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
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
    console.log(products)
}

exports.error404 = (req, res, next) => {
    // res.status(404).sendFile(error404PageLocation)
    res.status(404).render('error404', { pageTitle: 'ERROR 404', path: 'ERROR: 404' })
}