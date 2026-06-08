const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController')
const signUpRouter = require('./sign-up');
const logInRouter = require('./log-in');
const signOutRouter = require('./sign-out');
const memberRouter = require('./become-member');

indexRouter.get('/', indexController.get);
indexRouter.use('/sign-up', signUpRouter);
indexRouter.use('/log-in', logInRouter);
indexRouter.use('/sign-out', signOutRouter);
indexRouter.use('/become-member', memberRouter);

module.exports = indexRouter;