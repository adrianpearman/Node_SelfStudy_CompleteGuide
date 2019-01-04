exports.error404 = (req, res, next) => {
    // res.status(404).sendFile(error404PageLocation)
    res.status(404).render('error404', { pageTitle: 'ERROR 404', path: 'ERROR: 404' })
}