// Modules
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// Initalized Variables
const app = express()
const PORT = process.env.PORT || 3000

// View Engines
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
const userData = require('./routes/routes')
app.use(userData.routes)

app.listen(PORT, (error) => {
    if(!error){
        console.log(`Running on PORT: ${PORT}`)
    }else{
        console.error(error)
    }
})
