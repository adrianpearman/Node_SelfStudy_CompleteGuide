const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Routes
const appRoutes = require('./routes/route')

app.use(express.static(path.join(__dirname, 'public')))

app.use(appRoutes)

app.listen(PORT, (error) => {
    if(!error){
        console.log(`Running on PORT: ${PORT}`)
    }else{
        console.error(error)
    }
})

