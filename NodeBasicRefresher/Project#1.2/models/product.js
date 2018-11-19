const fs = require('fs')
const path = require('path')
const Path = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

const getProductsFromFile = callback => {
    fs.readFile(Path, (error, fileContent) => {
        if (error) {
            callback([])
        } else {
            callback(JSON.parse(fileContent))
        }
    })
}

module.exports = class Product{
    constructor(title){
        this.title = title
    }

    save(){
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(Path, JSON.stringify(products), (error) => {
                console.error(error)
            })
        })
    }

    static fetchAll(callback){
        getProductsFromFile(callback)
    }
}