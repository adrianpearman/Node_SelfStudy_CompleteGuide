const Product = require('../models/product')

// GET REQUESTS
exports.getAddProduct = (req, res, next) => {
    // res.sendFile( addProductFileLocation )
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
        // activeAddProduct: true
    })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/')
    }
    const prodID = req.params.productID
    req.user.getProducts({ where: {id: prodID}})
        .then(products => {
            const product = products[0]
            if(!product){
                return res.redirect('/')
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            })
        })
        .catch(err => console.log(err))
}

exports.getProductsList = (req, res, next) => {
    req.user.getProducts()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Product List',
                path: '/admin/products',
                prods: products
            })
        })
        .catch(err => console.log(err))
}

// POST REQUESTS
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageURL = req.body.imageURL
    const price = req.body.price
    const description = req.body.description
    req.user.createProduct({
        title: title,
        price: price,
        imageURL: imageURL,
        description: description,
        // userId: req.user.id
    })
        .then(result => {
            console.log(result)
            res.redirect('/admin/products')
        })
        .catch(err => {console.log(err)})
}

exports.postEditProduct = (req, res, next) => {
    const prodID = req.body.productID
    const updatedTitle = req.body.title
    const updatedImageURL = req.body.imageURL
    const updatedPrice = req.body.price
    const updatedDescription = req.body.description
    Product.findById(prodID)
        .then(product => {
            product.title = updatedTitle
            product.price = updatedPrice
            product.description = updatedDescription
            product.imageURL = updatedImageURL
            return product.save()
        })
        .then(result => {
            console.log('Updated Product')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

// DELETE REQUESTS
exports.postDeleteProduct = (req, res, next) => {
    const prodID = req.body.productID
    //    console.log(prodID)
    Product.destroy({ where: {id: prodID}})
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(err => {console.log(err)})

    // alternative approach
    // Product.findById(prodID)
    //     .then(product => {
    //         product.destroy()
    //     })
    //     .then(result => {
    //         console.log('Deleted item')
    //         res.redirect('/admin/products')
    //     })
    //     .catch(err => {console.log(err)})
}