const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoConnect = require('./util/database').mongoConnect
const mongoDB = require('mongodb')
const PORT = process.env.PORT || 3001
const app = express()

// to set ejs as the templating language
app.set('view engine', 'ejs')
app.set('views', 'views')

// Importing Routes 
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const error404 = require('./routes/error404')

const User = require('./models/user')

// Setting Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
    User.findById('5bf99533ef14be01d92e0ffb')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id)
            // console.log(user)
            next()
        })
        // .then(result => {
        //      return User
        //         .findById('5bf99533ef14be01d92e0ffb')
        //         .updateOne(
        //             { _id: new ObjectID(this._id) },
        //             { $set: { cart: { items: [] } } }
        //         )
           
        // })
        .catch(err=>console.log(err))
})

// Setting routes with express
app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(error404)

mongoConnect(() => {
    app.listen(PORT, (error) => {
        if(!error){
            console.log(`Listening on PORT: ${PORT}`)
        }else{
            console.error(error)
        }
    }) 
})



