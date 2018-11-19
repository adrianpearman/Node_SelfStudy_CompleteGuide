const express = require('express')
const router = express.Router()

// Faux Database
const users = []

// Routes
router.get('/', (req, res) => {
    res.render('add-user', {
        pageTitle: 'Add New User',
        path: '/'
    })
})

router.get('/users', (req, res) => {
    res.render('view-users', {
        pageTitle: 'View Users',
        path: '/users',
        allUsers: users
    })
})

router.post('/add-new-user', (req, res) => {
     const newUser = req.body
     users.push({ name: newUser.user })
     console.log(users)
     res.redirect('/users')
})

router.use((req, res, next) => {
    res.status(404).render('error404', {
        pageTitle: 'Error 404',
    })
})

exports.routes = router 
exports.users = users
