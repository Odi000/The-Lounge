const { Router } = require('express');
const createPostRouter = Router();
const createPostController = require('../controllers/createPostController');
// const createPostController = require('../controllers/createPostController');

createPostRouter.get('/', createPostController.get);
createPostRouter.post('/', createPostController.post);

module.exports = createPostRouter;