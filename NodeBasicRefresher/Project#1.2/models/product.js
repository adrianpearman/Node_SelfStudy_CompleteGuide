// NPM Modules
const fs = require('fs')
const path = require('path')

// grabbing the relative path from where the application is started. 
// will work regardless of the OS system
const Path = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
// Importing the Cart controller
const Cart = require('./cart')

// reads the data from the json file and returns to the value
const getProductsFromFile = callback => {
    fs.readFile(Path, (error, fileContent) => {
        if (error) {
            callback([])
        } else {
            callback(JSON.parse(fileContent))
        }
    })
}

// constructor function for each new product to be added
module.exports = class Product{
    constructor(id, title, imageURL, price, description){
        this.id = id
        this.title = title
        this.imageURL = imageURL
        this.description = description
        this.price = price
    }

    save(){
        getProductsFromFile(products => {
            // validates whether the product has alreeady been entered into the file
            // if it's already in the file, we update the existing product with the new information
            if(this.id){
               const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                //  makes a copy of the existing products
               const updatedProducts = [...products]
                //  sets the existing product to the new updated object
               updatedProducts[existingProductIndex] = this 
                // writes new object to the files
                fs.writeFile(Path, JSON.stringify(updatedProducts), (error) => {
                    console.error(error)
                })
            } else{
                // adds new object to products file
                // creates new id for the new object
                this.id = Math.random().toString()
                // push new product to products array
                products.push(this)
                // write new object to the file
                fs.writeFile(Path, JSON.stringify(products), (error) => {
                    console.error(error)
                })
            }
        })
    }

    // static is used to callback functions in the controller
    static fetchAll(callback){
        getProductsFromFile(callback)
    }

    static fetchByID(id, callback){
        getProductsFromFile(products => {
            // returns a single object with a provided id
            const product = products.find(prod => prod.id === id)
            callback(product)
        })
    }

    static deleteById(id){
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter(prod => prod.id !== id)
            // console.log(product)
            // writes changes to the file
            fs.writeFile(Path, JSON.stringify(updatedProducts), (error) =>{
                if(!error){
                    Cart.deleteProduct(id, product.price)
                }
                console.error(error)
            } )
        })
    }
}