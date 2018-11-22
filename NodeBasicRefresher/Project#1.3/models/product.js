const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Product = sequelize.define('product',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageURL:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Product




// Using a non Sequelize approach
// // NPM Modules
// const db = require('../util/database');

// // Importing the Cart controller
// const Cart = require('./cart')

// // constructor function for each new product to be added
// module.exports = class Product {
//     constructor(id, title, imageURL, price, description) {
//         this.id = id
//         this.title = title
//         this.imageURL = imageURL
//         this.description = description
//         this.price = price
//     }

//     save() {
//         return db.execute('INSERT INTO products (title, price, description, imageURL) VALUES (?,?,?,?)', [this.title, this.price, this.description, this.imageURL])
//     }

//     // static is used to callback functions in the controller
//     static fetchAll() {
//         return db.execute('SELECT * FROM products')
//     }

//     static fetchByID(id) {
//         return db.execute('SELECT * FROM products where products.id = ?', [id])
//     }

//     static deleteById(id) {
       
//     }
// }

