const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

// to set ejs as the templating language
app.set('view engine', 'ejs')

app.set('views', 'views')

// Routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const error404 = require('./routes/error404')
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(shopRoutes)
app.use('/admin', adminRoutes)
app.use(error404)

app.listen(PORT, (error) => {
    if(!error){
        console.log(`Listening on PORT: ${PORT}`)
    }else{
        console.error(error)
    }
})

