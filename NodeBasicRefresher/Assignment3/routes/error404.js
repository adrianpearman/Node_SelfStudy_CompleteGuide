const path = require('path')
const express = require('express')
const router = express.Router()
const rootDir = require('../utils/path')
const error404PageLocation = path.join( rootDir, 'views', 'error404.html')

router.use((req, res, next) => {
    res.status(404).sendFile(error404PageLocation)
}) 

module.exports = router