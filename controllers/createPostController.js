const { body, validationResult, matchedData } = require('express-validator');
const db = require('../db/queries');
const title = "Create a post";

const validatePost = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage("Title is required")
    ,
    body('content')
        .trim()
        .notEmpty()
        .withMessage("Content is required")
]

module.exports = {
    get: async (req, res) => {
        if (!req.user) {
            return res.redirect('log-in');
        }

        res.render('create-post', { title })
    },
    post: [
        validatePost,
        async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                console.log(errors.mapped());
                return res.render('create-post', { title, errors: errors.array() });
            }

            const { title, content } = matchedData(req);
            const post = {
                author_id: req.user.id,
                title,
                content,
                created_at: new Date().toISOString()
            }

            const result = await db.createPost(post);

            console.log("result:", result);
            res.redirect('/');
        }
    ]
}