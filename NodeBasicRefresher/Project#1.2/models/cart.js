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
            // grabs the product from the file with correct index
            const existingProduct = cart.products[existingProductIndex]
            // initializing the variable
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
            // creates the total value of the cart
            cart.totalPrice = cart.totalPrice + parseFloat(productPrice)
            // writes the changes to the file
            fs.writeFile(Path, JSON.stringify(cart), error => {
                console.error(error)
            })
        })
    }

    // retrieves the whole cart
    static getCart(callback){
        fs.readFile(Path, (error, fileContent) => {
            const cart = JSON.parse(fileContent)
            if(error){
                callback(null)
            } else {
                callback(cart)
            }
        })
    }

    // deletes a value from the cart
    static deleteProduct(id, productPrice){
        fs.readFile(Path, (error, fileContent) => {
            if (error){
                return
            }
            const updatedCart = {...JSON.parse(fileContent)}
            // grabs the individual product we are looking to delete
            const product = updatedCart.products.find(prod => prod.id === id)
            // exits the function if the product does not exist
            if(!product){
                return 
            }
            const productQuantity = product.quantity
            // filters out id that has been deleted
            // !== in filter returns everything not matching the id
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            // updates the total price of the cart
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQuantity
            // writes new changes to the file
            fs.writeFile(Path, JSON.stringify(updatedCart), (error => {
                console.error(error)
            }))
        })
    }
}