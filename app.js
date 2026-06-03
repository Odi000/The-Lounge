const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('node:path');
const pool = require('./db/pool');
const pgSession = require('connect-pg-simple')(session);
const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    store: new pgSession({
        pool: pool
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    if (req.user) {
        res.locals.currentUser = req.user;
    }
    
    next();
})
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`http://localhost:${PORT}/`);
})