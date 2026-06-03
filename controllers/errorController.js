module.exports = {
    get: (error, req, res, next) => {
        console.error(error)
        res.status(500).render('error')
    }
}