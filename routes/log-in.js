const { Router } = require('express');
const logInRouter = Router();
const loginController = require('../controllers/loginController');

logInRouter.get('/',loginController.get);
logInRouter.post('/',loginController.post);

module.exports = logInRouter;