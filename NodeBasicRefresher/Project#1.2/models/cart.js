const fs = require('fs')
const path = require('path')
const Path = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json' )

module.exports = class Cart {
    static addProduct(id, productPrice){
        // fetch the existing cart from the data file
        fs.readFile(Path, (error, fileContent) => {
            let cart = { products: [], totalPrice: 0}
            if(!error){
                cart = JSON.parse(fileContent)
            }
            // Analyze the cart then find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct
            // Add new product to the cart / increase quantity
            if(existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.quantity = updatedProduct.quantity + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: id, quantity: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + parseFloat(productPrice)
            fs.writeFile(Path, JSON.stringify(cart), error => {
                console.error(error)
            })
        })
    }

}