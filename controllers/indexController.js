const db = require('../db/queries');
const stylesheet = "styles.css";

module.exports = {
    get: async (req, res) => {
        const posts = await db.getAllPosts();
        console.log(posts)
        res.render('index', { posts, stylesheet })
    }
}