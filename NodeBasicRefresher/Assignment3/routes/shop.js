const express = require('express')
const path = require('path')
const router = express.Router()
const rootDir = require("../utils/path")
const shopFileLocation = path.join( rootDir, "views", "shop.html" )

router.get('/', (req, res, next) => {
    res.sendFile( shopFileLocation )
})

module.exports = router