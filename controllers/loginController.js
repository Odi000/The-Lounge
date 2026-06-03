const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const title = "Log in";
const db = require('../db/queries');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUserByUsername(username);

            if (!user) {
                return done(null, false, { message: "Incorrect username" })
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return done(null, false, { message: "Incorrect password" })
            }

            done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);

        done(null, user);
    } catch (err) {
        done(err)
    }
});

module.exports = {
    get: (req, res) => {
        res.render('log-in', { title })
    },
    post: passport.authenticate('local', { successRedirect: '/', failureRedirect: '/log-in' })
}