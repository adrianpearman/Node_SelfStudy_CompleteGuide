const express = require('express')
const router = express.Router()
const errorHandlerController = require('../controllers/error')

router.use(errorHandlerController.error404) 

module.exports = router