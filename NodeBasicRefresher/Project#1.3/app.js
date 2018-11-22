const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./util/database')
const PORT = process.env.PORT || 3001
const app = express()
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

// to set ejs as the templating language
app.set('view engine', 'ejs')
app.set('views', 'views')

// Importing Routes 
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const error404 = require('./routes/error404')

// Setting Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
    User.findById(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err=>console.log(err))
})

// Setting routes with express
app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(error404)


// initializing MySQL table
// Setting relationships between the tables.
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })

sequelize
// - used to clear the database in development
    .sync({ force: true }) 
    // .sync()
    .then(result => {
        return User.findById(1)
    })
    .then(user => {
        if(!user){
            return User.create({ name: 'Adrian', email: 'adrianpearman12@gmail.com'})
        }
        return user
    })
    .then(user => {
        user.createCart()
    })
    .then((user) => {
        // console.log(user)
         app.listen(PORT, (error) => {
            if(!error){
                console.log(`Listening on PORT: ${PORT}`)
            }else{
                console.error(error)
            }
        })   
    })
    .catch(err => {
        console.log(err)
    })



