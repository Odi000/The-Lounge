const db = require('../db/queries');
const stylesheet = "styles.css";
const title = "The Longue"

module.exports = {
    get: async (req, res) => {
        const user = req.user ? req.user : {};
        const posts = await db.getAllPosts();
        if (!user.is_member) {
            for (const post of posts) {
                post.author = '*****';
            }
        }
        res.render('index', { posts, stylesheet, title })
    }
}