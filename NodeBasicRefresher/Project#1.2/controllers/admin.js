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
    if(!editMode){
        return res.redirect('/')
    }
    const prodID = req.params.productID
    Product.fetchByID(prodID, product => {
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
}

exports.getProductsList = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            pageTitle: 'Product List',
            path: '/admin/products',
            prods: products
        })
    })
}

// POST REQUESTS
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageURL = req.body.imageURL
    const price = req.body.price
    const description = req.body.description
    const product = new Product(null, title, imageURL, price, description)
    product.save()
    res.redirect('/')
}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.productID
    const updatedTitle = req.body.title
    const updatedImageURL = req.body.imageURL
    const updatedPrice = req.body.price
    const updatedDescription = req.body.description
    const updatedProduct = new Product(id, updatedTitle, updatedImageURL, updatedPrice, updatedDescription)
    // console.log(updatedProduct)
    updatedProduct.save()
    res.redirect('/admin/products')
}

// DELETE REQUESTS
exports.postDeleteProduct = (req, res, next) => {
   const prodID = req.body.productID 
//    console.log(prodID)
   Product.deleteById(prodID) 
   res.redirect('/admin/products')
}