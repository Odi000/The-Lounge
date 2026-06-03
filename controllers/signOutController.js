module.exports = {
    get: (req, res, next) => {
        req.logOut((err) => {
            if (err) {
                return next(err)
            }
            res.redirect('/');
        })
    }
}