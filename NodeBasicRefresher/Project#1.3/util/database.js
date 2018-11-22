//Set up using just MySQL
// const mysql = require('mysql2')
// // creates the pool for our connection to the mysql database
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'REDbull45!'
// })
// module.exports = pool.promise()

// Set up using Sequlize 
const Sequelize = require('sequelize')
const sequelize = new Sequelize('node-complete', 'root', 'REDbull45!', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize