const path = require('path')
const express = require('express')

const rootDir = require('../utils/path')
const router = express.Router()

const homePageLocation = path.join(rootDir, 'views', 'home.html')
const usersPageLocation = path.join(rootDir, 'views', 'users.html')

router.get('/', (req, res) => {
    res.sendFile(homePageLocation)  
})

router.get('/users', (req, res) => {
    res.sendFile(usersPageLocation)  
})


module.exports = router