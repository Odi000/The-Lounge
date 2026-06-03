module.exports = {
    get: (req, res) => {
        console.log(req.user)
        res.render('index', {})
    }
}