const path = require('path')
const express = require('express')
const router = express.Router()
const rootDir = require('../utils/path')
const error404PageLocation = path.join( rootDir, 'views', 'error404.html')

router.use((req, res, next) => {
    // res.status(404).sendFile(error404PageLocation)
    res.status(404).render('error404', {pageTitle: 'ERROR 404', path: 'ERROR: 404'})
}) 

module.exports = router