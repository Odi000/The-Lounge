const db = require('../db/queries');

module.exports = {
    post: async (req, res) => {
        const code = req.body.code;
        const userId = req.user.id;
        if (code === 'AX51384') {
            await db.becomeMember(userId);
        }

        res.redirect('/');
    }
}