const { Router } = require('express');
const signUpRouter = Router();
const signUpController = require('../controllers/signUpController');

signUpRouter.get('/', signUpController.get);
signUpRouter.post('/', signUpController.post);

module.exports = signUpRouter;