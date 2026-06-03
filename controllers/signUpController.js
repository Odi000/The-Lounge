const { body, validationResult, matchedData } = require('express-validator');
const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const title = "Sign Up";

const validateUsername = [
    body("username")
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters long')

        .matches(/^[a-zA-Z_\.-]+$/)
        .withMessage('Username can only contain letters (a-z, A-Z), underscores (_), hyphens (-), and dots (.)')

        .notEmpty()
        .withMessage('Username is required')
]

const validatePassword = [
    body("password")
        .isLength({ min: 1, max: 50 })
        .withMessage('Password must be between 1 and 50 characters long')

        .not().matches(/\s/)
        .withMessage('Password cannot contain spaces')

        .notEmpty()
        .withMessage('Password is required'),

    body("confirmPassword")
        .notEmpty()
        .withMessage('Please confirm your password')

        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];

const validateEmail = [
    body("email")
        .isEmail()
        .withMessage('Please provide a valid email address.')

        .customSanitizer(value => {
            return value.toLowerCase();
        })
]

module.exports = {
    get: (req, res) => {
        res.render('sign-up', { title })
    },
    post: [
        validateUsername,
        validateEmail,
        validatePassword,
        async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                console.log(errors.mapped())
                return res.render('sign-up', { title, errors: errors.array() })
            }

            try {
                const { username, password, email } = matchedData(req);
                const hashedPassword = await bcrypt.hash(password, 3);
                const result = await db.createUser(username, email, hashedPassword, password);

                res.redirect('/');
            } catch (error) {
                console.error("Error:", error.message);

                res.render('sign-up', {
                    title,
                    errors: [{ msg: 'Error: ' + error.message }]
                })
            }
        }
    ]
}